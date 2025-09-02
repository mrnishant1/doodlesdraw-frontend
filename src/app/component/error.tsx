// components/ErrorPage.tsx
"use client";
import { MdError } from "react-icons/md";

interface ErrorPageProps {
  error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="h-full w-full">
        <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <MdError className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <a
          href="/"
          className="inline-block px-6 py-2 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
    </div>
  );
}
