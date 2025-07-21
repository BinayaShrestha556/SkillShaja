"use client";
import Image from "next/image";
import React from "react";
import Chat from "./chat";

const Ai = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="fixed bottom-10  right-2 md:right-10 z-50 ">
      {isOpen && (
        <div
          className="fixed inset-0 h-screen w-screen z-50 "
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative transform transition-transform w-12 md:w-16 aspect-square flex items-center justify-center rounded-full   from-primary backdrop-blur-2xl  ease-in-out duration-300 to-[#fb5df8]  bg-gradient-to-br ${
          isOpen
            ? "-translate-y-[28rem]"
            : " motion-translate-y-loop-25 translate-y-0 motion-scale-loop-90  motion-ease-in-out motion-duration-1500"
        }`}
      >
        <Image
          src="/ai_black.png"
          alt="AI Logo"
          fill
          className="rounded-full bg-blend-overlay "
        />
      </button>
      {isOpen && <Chat />}
    </div>
  );
};

export default Ai;
