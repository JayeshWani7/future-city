"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";

// Define the type for complaint objects
interface Complaint {
  id: string;
  category: string;
  description: string;
  location: string;
  status: string;
  createdAt: Timestamp; // Use 'Timestamp' from Firestore if needed
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]); // Explicitly set the type

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const snapshot = await getDocs(collection(db, "complaints"));
        const complaintsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Complaint[]; // Cast to the Complaint type
        setComplaints(complaintsData);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
          Admin Dashboard
        </h1>
        <div className="overflow-hidden rounded-lg shadow-md bg-gray-800/80">
          <table className="w-full text-left text-sm text-gray-200">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3">{complaint.category}</td>
                  <td className="px-4 py-3">{complaint.description}</td>
                  <td className="px-4 py-3">{complaint.location}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        complaint.status === "resolved"
                          ? "bg-green-600 text-green-100"
                          : complaint.status === "in-progress"
                          ? "bg-yellow-600 text-yellow-100"
                          : "bg-red-600 text-red-100"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  