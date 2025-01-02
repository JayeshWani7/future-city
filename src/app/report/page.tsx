import { ComplaintForm } from '@/components/ComplaintForm';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#1a1523] text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[#262033] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Submit a Complaint</h1>
        <ComplaintForm />
      </div>
    </div>
  );
}
