"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && userRole === "admin") {
      router.push("/admin");
    } else if (user && userRole === "user") {
      router.push("/user");
    }
  }, [user, userRole, router]);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSignUp = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;
      const role = "user"; // Default role as user
      await setDoc(doc(db, "users", uid), { email, role });
      setUser(result.user);
      setUserRole(role);
    } catch (err: any) {
      setError(err.message || "Sign Up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(result.user);
        setUserRole(userData?.role || null);
      } else {
        throw new Error("User role not found in database.");
      }
    } catch (err: any) {
      setError(err.message || "Sign In failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (err: any) {
      setError(err.message || "Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#1a0b2e" }}>
      {!user ? (
        <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-white/70">
              {isSignUp
                ? "Enter your email below to create your account"
                : "Enter your email below to sign in to your account"}
            </p>
          </div>
          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/10 bg-white/10 text-white placeholder:text-white/50 rounded-lg backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/10 bg-white/10 text-white placeholder:text-white/50 rounded-lg backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Button
              onClick={isSignUp ? handleSignUp : handleSignIn}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg animate-glow"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Button
              variant="ghost"
              onClick={toggleAuthMode}
              className="w-full text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
              disabled={isLoading}
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              Welcome, {user.email}
            </h2>
            <p className="text-white/70">You are logged in as: {userRole}</p>
          </div>
          <div>
            {userRole === "admin" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">Admin Dashboard</h2>
                <p className="text-white/70">
                  Manage users and access administrative features here.
                </p>
              </div>
            )}
            {userRole === "user" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">User Dashboard</h2>
                <p className="text-white/70">
                  Access your personalized content and features here.
                </p>
              </div>
            )}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg animate-glow"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
