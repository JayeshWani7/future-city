"use client";

import { useState } from "react";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const [user] = useAuthState(auth);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) throw new Error("User not authenticated");

      await addDoc(collection(db, "complaints"), {
        category,
        description,
        location,
        status: "pending",
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      alert("Complaint registered successfully.");
      setCategory("");
      setDescription("");
      setLocation("");
    } catch (error) {
      console.error("Error registering complaint:", error);
      alert("Failed to register complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#1a0b2e" }}>
      <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4">User Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Category</label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="e.g., Water, Security"
              className="border-white/10 bg-white/10 text-white placeholder:text-white/50 rounded-lg backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="e.g., No water supply for 2 days"
              className="border-white/10 bg-white/10 text-white placeholder:text-white/50 rounded-lg backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Location</label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g., 123 Main St"
              className="border-white/10 bg-white/10 text-white placeholder:text-white/50 rounded-lg backdrop-blur-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg animate-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </div>
    </div>
  );
}
