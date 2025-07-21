"use client";
import { useChatStore } from "@/store-hooks/useChatStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessages() {
  const session = useSession();
  const userAvatar = session.data?.user?.image || "/avatar.png";
  const messages = useChatStore((state) => state.messages);
  const loading = useChatStore((state) => state.loading);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col ">
      {messages.map((msg, i) => (
        <div
          className={`flex items-start gap-1.5 ${
            msg.sender === "user" ? "flex-row-reverse" : ""
          }`}
          key={i}
        >
          <div
            className={`relative h-8 w-8 mt-1 p-2 rounded-full ${
              msg.sender === "user" ? "bg-secondary" : "bg-primary"
            }`}
          >
            <Image
              src={msg.sender === "user" ? userAvatar : "/ai_black.png"}
              alt="Avatar"
              fill
              className="rounded-full p-0.5"
            />
          </div>
          <div
            key={i}
            className={`p-2 rounded-2xl max-w-[calc(100%-4rem)] text-sm  ${
              msg.sender === "user"
                ? "bg-accent border-accent-foreground/30 border text-accent-foreground self-end ml-auto"
                : "border bg-secondary text-secondary-foreground  self-start"
            }`}
          >
            {<ReactMarkdown>{msg.message}</ReactMarkdown>}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex items-start gap-1.5">
          <div
            className={`relative h-8 w-8 mt-1 px-3 py-1 rounded-full 
             bg-primary
            `}
          >
            <Image
              src={"/ai_black.png"}
              alt="Avatar"
              fill
              className="rounded-full p-0.5"
            />
          </div>

          <div
            className={`px-3 py-1 rounded-2xl flex items-center gap-0.5 text-2xl max-w-[calc(100%-4rem)] bg-secondary text-secondary-foreground self-start`}
          >
            <div className="animate-bounce" style={{ animationDelay: "0ms" }}>
              .
            </div>
            <div className="animate-bounce" style={{ animationDelay: "200ms" }}>
              .
            </div>
            <div className="animate-bounce" style={{ animationDelay: "400ms" }}>
              .
            </div>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
