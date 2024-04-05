"use client";

import { SignInButton, useUser } from "@clerk/nextjs";

import Link from "next/link";

import ProfileButton from "@/components/ProfileButton";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-[#000]">
      <nav className="flex items-center justify-between p-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-[#C5FF00] hover:scale-[101%]">
            FDM Flat Finder
          </h1>
        </Link>

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <ProfileButton user={user} />
            </>
          ) : (
            <SignInButton className="rounded-full bg-[#C5FF00] px-4 py-2 hover:scale-[101%]" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
