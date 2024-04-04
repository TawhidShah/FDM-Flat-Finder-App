"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SignInButton, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import ProfileButton from "@/components/ProfileButton";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-[#27303F]">
      <nav className="flex items-center justify-between p-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-white hover:scale-[101%]">
            FDM Flat Finder
          </h1>
        </Link>

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              {/* <UserButton /> */}
              <ProfileButton user={user} />
            </>
          ) : (
            <SignInButton className="rounded-full bg-[#F9A826] px-4 py-2 text-white hover:scale-[101%]" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
