"use client";
import { useChatStore } from "@/store-hooks/useChatStore";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChatBottom() {
  const [input, setInput] = useState("");
  const { addMessage, setLoading } = useChatStore();
  const sendMessage = async (text: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (data?.reply) {
        addMessage({ sender: "bot", message: data.reply });
      }
    } catch (err) {
      console.log(err);
      addMessage({ sender: "bot", message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage({ sender: "user", message: input });
    setInput("");
    await sendMessage(input);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 ">
      <Input
        className="flex-1 border rounded-2xl p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <Button type="submit" className=" px-4 py-2 rounded-2xl">
        Send
      </Button>
    </form>
  );
}
