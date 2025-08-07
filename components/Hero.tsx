"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Turn Any Document Into An API.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Coredoc transforms linear documents into navigable knowledge graphs, without a single scroll.
        </p>
        <Link
          href="/app"
          className="inline-block px-8 py-4 bg-black text-white text-lg font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          Launch App →
        </Link>
      </div>
    </section>
  );
}