"use client";

import { useState } from "react";
import { useRouter } from "next/router";  // Ensure correct import
import { auth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Correctly initialize useRouter

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSignUp = async () => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;
      const role = "user";  // Default role as user
      await setDoc(doc(db, "users", uid), { email, role });
      
      // Redirect to user dashboard
      router.push("/user");
    } catch (err: any) {
      setError(err.message || "Sign Up failed. Please try again.");
    }
  };

  const handleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Redirect based on role after successful login
        if (userData?.role === "admin") {
          router.push("/admin"); // Redirect to admin dashboard
        } else {
          router.push("/user"); // Redirect to user dashboard
        }
      } else {
        throw new Error("User role not found in database.");
      }
    } catch (err: any) {
      setError(err.message || "Sign In failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="glass-card mx-auto max-w-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-white">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
        />
        <button
          onClick={isSignUp ? handleSignUp : handleSignIn}
          className="button-primary mt-6 w-full"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="mt-4 text-white/70">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-blue-400 underline hover:text-blue-500"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
