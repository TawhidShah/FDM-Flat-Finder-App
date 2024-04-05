"use client";
import Link from "next/link";

import WelcomeMessage from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <WelcomeMessage />
      <div className="mt-10">
        <Link
          href="/listings"
          className="inline-block rounded-lg bg-primary p-3 px-6 text-2xl text-black transition-colors hover:bg-white"
        >
          Start Your Search
        </Link>
      </div>
    </main>
  );
}
