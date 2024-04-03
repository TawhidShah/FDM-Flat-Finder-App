"use client";
import WelcomeMessage from "../components/WelcomeMessage";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <WelcomeMessage />
      <div className="mt-10">
        <Link
          href="/listings"
          className="hover:bg-primary-dark inline-block rounded-lg bg-primary p-3 px-6 text-2xl text-primary-foreground transition-colors"
        >
          Start Your Search
        </Link>
      </div>
    </main>
  );
}
