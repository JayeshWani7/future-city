import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-lg p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-4">
          Thank You for Your Report
        </h1>
        <p className="text-white/70 mb-6">
          Your complaint has been successfully submitted. We will review it shortly.
        </p>
        <Button asChild className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
