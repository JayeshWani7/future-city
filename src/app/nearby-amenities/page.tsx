import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1a1523] text-white p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center tracking-wide">
        Citizen Complaint System
      </h1>
      <div className="flex gap-6">
        <Button asChild className="bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-3 rounded-lg">
          <Link href="/report">Submit a Complaint</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-lg"
        >
          <Link href="/admin">Admin Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
