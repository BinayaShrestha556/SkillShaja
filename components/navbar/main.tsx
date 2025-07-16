import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import NavbarActions from "./action";
import Link from "next/link";
import Search from "./search/search";
import { SessionProvider } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-10 flex items-center justify-between z-50">
      <div className="flex items-center gap-5 relative">
        <h1 className="text-3xl font-bold text-nowrap text-primary">
          {" "}
          <Link href={"/"}>Logo here</Link>{" "}
        </h1>
        <ul className="flex  gap-5">
          <li className="hover:text-primary hover:underline cursor-pointer">
            <Link href={"/about"}>about</Link>
          </li>
          <li className="hover:text-primary hover:underline cursor-pointer">
            <Link href={"/explore"}>explore</Link>
          </li>
        </ul>
        <Search />
      </div>
      <div className="flex items-center relative">
        <SessionProvider>
          <NavbarActions />
        </SessionProvider>
      </div>
    </nav>
  );
};

export default Navbar;
