// src/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Zenara
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Choose your path to enlightenment
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            to="/train"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Train me
          </Link>
          <Link
            to="/happy"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Make me happy
          </Link>
        </div>
      </div>
    </main>
  );
}
