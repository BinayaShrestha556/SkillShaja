"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import SearchResults from "./search-results";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Search = () => {
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const [searchData, setSearchData] = React.useState<{
    courses: { id: string; name: string; image: { url: string } }[];
    users: { id: string; name: string; image: string }[];
  } | null>(null);
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = e.target.value;
    if (value.length == 0) {
      setSearchData(null);
      setLoading(false);
      setQ("");
      return;
    }
    setQ(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (!value.trim()) return;
      const response = await fetch(
        `/api/courses/search?q=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setSearchData(data);
      setLoading(false);
    }, 1000);
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchDataOpen, setIsSearchDataOpen] = useState(false);
  return (
    <div className="w-full relative flex items-center flex-1">
      <Input
        onFocus={() => {
          setIsSearchDataOpen(true);
        }}
        onBlur={() => {
          setIsSearchDataOpen(false);
        }}
        placeholder="Search anything"
        className={cn(
          "rounded-full p-5 transition backdrop-blur-xl lg:pl-12  bg-white border  ",
          {
            " z-40 fixed right-0 opacity-100 ": isSearchOpen,
            "w-0 opacity-0 lg:opacity-100 lg:w-80 ": !isSearchOpen,
          }
        )}
        onChange={onChange}
      />
      {isSearchDataOpen && (
        <div
          className="w-screen h-screen bg-transparent fixed inset-0 z-30"
          onClick={() => {
            setIsSearchDataOpen(false);
          }}
        ></div>
      )}
      {isSearchOpen && (
        <div
          className="w-screen h-screen bg-transparent fixed inset-0 z-30"
          onClick={() => {
            setIsSearchOpen(false);
          }}
        ></div>
      )}
      <FaSearch
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        size={10}
        className="w-8 h-8 left-[5px]   md:right-1.5 p-1.5 absolute cursor-pointer rounded-full bg-primary text-white"
      />{" "}
      {!loading && isSearchDataOpen && q && searchData && (
        <SearchResults
          courses={searchData.courses}
          users={searchData.users}
          hidden={!isSearchOpen}
        />
      )}
      {isSearchDataOpen && q && loading && (
        <div
          className={cn(
            "absolute md:top-[125%] top-10 -left-40 md:left-0 w-80 p-4 bg-white border rounded-md shadow-lg z-50",
            {
              "hidden lg:block": !isSearchOpen,
            }
          )}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default Search;
