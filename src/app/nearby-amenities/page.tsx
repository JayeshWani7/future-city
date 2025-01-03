import Link from "next/link";
import Globe from "@/components/ui/globe";

interface ButtonProps {
  label: string;
  href: string;
}

function StyledButton({ label, href }: ButtonProps) {
  return (
    <Link href={href}>
      <button className="group relative h-12 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-8 text-white font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_0 rgba(139,92,246,0.3)] hover:from-purple-600 hover:to-indigo-700">
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100" />
      </button>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1a1523] text-white p-8 relative">
      <h1 className="text-5xl font-extrabold mb-12 text-center tracking-wide relative z-10 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Citizen Complaint System
      </h1>
      <div className="absolute inset-0 -z-7 flex items-center justify-center">
        <span className="absolute overflow-hidden pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        </span>
        <Globe className="w-full h-full opacity-80" />
      </div>

      <div className="flex gap-8 relative z-10">
        <StyledButton label="Submit a Complaint" href="/report" />
        <StyledButton label="Admin Dashboard" href="/admin" />
      </div>
    </main>
  );
}
