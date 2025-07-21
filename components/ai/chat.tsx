"use client";

import ChatMessages from "./ChatMessages";
import ChatBottom from "./ChatBottom";

export default function Chat() {
  return (
    <div className="flex z-50 absolute bg-card  right-3  shadow-xl bottom-0 flex-col h-[27rem] w-[20rem] mx-auto border rounded-3xl">
      <ChatMessages />
      <ChatBottom />
    </div>
  );
}
