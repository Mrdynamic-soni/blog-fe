"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 text-center">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full space-y-6">
        <AlertTriangle className="mx-auto text-yellow-500" size={48} />
        <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          Go to Homepage
        </button>
      </div>
    </main>
  );
}
