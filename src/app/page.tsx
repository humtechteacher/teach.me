import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-indigo-700 mb-4">Humanities Tech Tools</h1>
          <p className="text-xl text-gray-700">
            Explore interactive tools designed to enhance student learning in the Humanities.
          </p>
        </header>

        <section className="grid gap-8 sm:grid-cols-2">
          {/* Disinformation Activity Card */}
          <Link
            href="/disinfo"
            className="block p-6 bg-white shadow-md rounded-lg border hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
              🕵️‍♂️ Disinformation Challenge
            </h2>
            <p className="text-gray-600">
              Analyze AI-generated disinformation tweets and provide sources that refute them.
              Test your critical thinking skills!
            </p>
          </Link>

          {/* Placeholder for future activities */}
          <div className="p-6 bg-white shadow-md rounded-lg border opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">📚 More Activities Coming Soon</h2>
            <p className="text-gray-400">
              Stay tuned for more interactive experiences for literature, history, and philosophy.
            </p>
          </div>
        </section>

        <footer className="mt-24 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Humanities Tech Tools. Built for curious minds.
        </footer>
      </div>
    </main>
  );
}
