import React from "react";
import NavbarActions from "./action";
import Link from "next/link";
import Search from "./search/search";
import { SessionProvider } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-2 md:px-10 flex items-center justify-between z-50">
      <div className="flex items-center gap-5 relative">
        <h1 className="text-2xl font-bold text-nowrap text-primary">
          {" "}
          <Link href={"/"}>Sikaoo</Link>{" "}
        </h1>
        <ul className="flex  gap-3 md:gap-5 text-muted-foreground">
          <li className="hover:text-primary  hover:underline text-sm md:text-base cursor-pointer">
            <Link href={"/about"}>about</Link>
          </li>
          <li className="hover:text-primary hover:underline text-sm md:text-base cursor-pointer">
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
