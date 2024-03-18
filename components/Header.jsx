"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="bg-[#27303F]">
      <nav className="flex items-center justify-between p-8">
        <Link href="/">
          <h1 className="text-xl font-bold">FDM Flat Finder</h1>
        </Link>

        <h1 className="font-bold text-xl text-white">NEEDS WORK</h1>

        <div className="z-[100000] lg:hidden">
          <button onClick={() => setShowNav(!showNav)}>
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
