"use client";

import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";
import SearchResults from "./search-results";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    courses: { id: string; name: string; image: { url: string } }[];
    users: { id: string; name: string; image?: string }[];
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);
    setLoading(true);

    if (timer.current) clearTimeout(timer.current);

    if (value.trim() === "") {
      setResults(null);
      setLoading(false);
      return;
    }

    timer.current = setTimeout(async () => {
      const res = await fetch(
        `/api/courses/search?q=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 500);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex items-center">
      {/* Input */}
      <Input
        type="search"
        placeholder="Search anything"
        onFocus={() => setIsOpen(true)}
        onChange={handleChange}
        value={q}
        className={cn(
          "rounded-full p-5 transition backdrop-blur-xl lg:pl-12  bg-white border  ",
          {
            " z-40 fixed right-0 opacity-100 md:block ": isOpen,
            "w-0 opacity-0 lg:opacity-100 lg:w-80 ": !isOpen,
          }
        )}
      />

      {/* Search Icon */}
      <FaSearch
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 absolute left-2 md:right-2 p-1.5 cursor-pointer rounded-full bg-primary text-white z-30"
      />

      {/* Results */}
      {isOpen && q && (
        <>
          {loading ? (
            <div className="absolute top-12 left-0 md:left-auto md:top-[125%] w-80 p-4 bg-white border rounded-md shadow-lg z-50">
              Loading...
            </div>
          ) : (
            results && (
              <SearchResults courses={results.courses} users={results.users} />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Search;
