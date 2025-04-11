// app/not-found.js atau app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-xl text-gray-300 mb-8">
          We&apos;re working hard to bring you something amazing. Please check back
          later.
        </p>

        <div className="w-24 h-1 bg-white mb-8 rounded"></div>

        <p className="text-gray-400 mb-4">
          The page you&apos;re looking for is still under construction.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </Link>
      </main>

      <footer className="mt-16 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Tradisco. All rights reserved.
      </footer>
    </div>
  );
}
