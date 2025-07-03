import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground text-sm mt-20 w-full py-10 ">
      <div className="w-[70%] m-auto border-b">
        {" "}
        <h2 className="font-bold text-2xl">SkillSajha</h2>
        <div className="flex  w-full items-center">
          <ul className="decoration-0 text-muted-foreground flex-1">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Premium</a>
            </li>
            <li>
              <a href="#">Developers</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-3 text-2xl ">
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaLinkedin />
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-2"> Copyright &copy; Binaya Shrestha 2025</p>
    </footer>
  );
};

export default Footer;
