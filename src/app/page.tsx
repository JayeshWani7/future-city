"use client";

import { useState } from "react";
import { auth, db } from "../config/firebaseConfig"; // Import Firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSignUp = async () => {
    setError(null); // Clear previous errors
    try {
      // Create a new user in Firebase Authentication
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;

      // Default role for all new users will be 'user'
      const role = "user";

      // Store user role in Firestore
      await setDoc(doc(db, "users", uid), { email, role });

      setUser(result.user);
      setUserRole(role);
    } catch (err: any) {
      setError(err.message || "Sign Up failed. Please try again.");
    }
  };

  const handleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      // Authenticate existing user in Firebase Authentication
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = result.user;

      // Fetch user role from Firestore
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
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (err: any) {
      setError(err.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div>
      {!user ? (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
          />
          {/* No role selection on Sign Up */}
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            style={{ padding: "10px 20px", marginTop: "10px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={toggleAuthMode} style={{ textDecoration: "underline", color: "blue", background: "none", border: "none" }}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Welcome, {user.email}!</p>
          <p>Your Role: {userRole}</p>
          <button onClick={handleLogout} style={{ padding: "10px 20px", margin: "10px" }}>
            Logout
          </button>

          {userRole === "admin" && (
            <div>
              <h2>Admin Dashboard</h2>
              <p>Manage users and access administrative features here.</p>
            </div>
          )}

          {userRole === "user" && (
            <div>
              <h2>User Dashboard</h2>
              <p>Access your personalized content and features here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
