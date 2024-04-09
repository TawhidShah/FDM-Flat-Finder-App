"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <div className="mt-20 text-center">
        <Image
          src="/images/FDMLogo.png"
          alt="FDM logo"
          className="mx-auto"
          width={200}
          height={200}
        />

        <h1 className="mb-4 text-6xl font-bold text-white">
          Welcome to FDM Flat Finder
        </h1>
        <p className="font-montserrat mb-6 text-xl text-white">
          Find your perfect flat with ease.
        </p>
      </div>
      <div className="mt-10">
        <Link
          href="/listings"
          className="inline-block rounded-lg bg-primary p-3 px-6 text-2xl font-bold text-black hover:bg-white"
        >
          Start Your Search
        </Link>
      </div>
    </main>
  );
}
