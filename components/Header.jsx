"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="bg-[#27303F]">
      <nav className="flex items-center justify-between p-6">
        <Link href="/">
          <h1 className="text-xl font-bold">FDM Flat Finder</h1>
        </Link>

        <h1 className="text-xl font-bold text-white">NEEDS WORK</h1>

        <div className="z-[100000] lg:hidden">
          <button onClick={() => setShowNav(!showNav)}>
            <Menu className="h-8 w-8" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <UserButton afterSignOutUrl="/" />

          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" />
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
