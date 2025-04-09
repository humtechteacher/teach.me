'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome to Activity Hub
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Explore interactive and engaging activities designed for high school learners in English, History, and Social Science. 
          Click an activity below to get started.
        </p>
        <div className="space-y-4">
          <Link href="/disinformation">
            <h2 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 rounded-lg transition-transform transform hover:scale-105 text-center block">
              Disinformation Game
            </h2>
          </Link>
          <Link href="/steelman">
            <h2 className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-lg transition-transform transform hover:scale-105 text-center block">
              Steelman Challenge
            </h2>
          </Link>
          <Link href="/activities/history-quiz">
            <h2 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg transition-transform transform hover:scale-105 text-center block">
              History Quiz Show
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
