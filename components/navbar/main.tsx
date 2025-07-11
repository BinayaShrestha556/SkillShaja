import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import NavbarActions from "./action";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-10 flex items-center justify-between z-50">
      <div className="flex items-center gap-5 relative">
        <h1 className="text-3xl font-bold text-nowrap text-primary">
          {" "}
          Logo here{" "}
        </h1>
        <ul className="flex  gap-5">
          <li className="hover:text-primary hover:underline cursor-pointer">
            about
          </li>
          <li className="hover:text-primary hover:underline cursor-pointer">
            explore
          </li>
        </ul>
        <Input
          placeholder="Search anything"
          className="rounded-full p-5 w-80 backdrop-blur-xl bg-white border"
        />
        <FaSearch
          size={10}
          className="w-8 h-8  p-1.5 cursor-pointer absolute right-[5px] rounded-full bg-primary text-white"
        />{" "}
      </div>
      <div className="flex items-center relative">
        <NavbarActions />
      </div>
    </nav>
  );
};

export default Navbar;
