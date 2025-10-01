import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">Logo</h1>

      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/write">Write</Link>
      </div>
    </header>
  );
};

export default Navbar;
