"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import SearchResults from "./search-results";
import { FaSearch } from "react-icons/fa";

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
  return (
    <div className="w-full relative">
      <Input
        placeholder="Search anything"
        className="rounded-full p-5 w-80 backdrop-blur-xl bg-white border"
        onChange={onChange}
      />
      <FaSearch
        size={10}
        className="w-8 h-8 top-[5px] p-1.5 cursor-pointer absolute right-[5px] rounded-full bg-primary text-white"
      />{" "}
      {q && searchData && (
        <SearchResults courses={searchData.courses} users={searchData.users} />
      )}
      {q && loading && (
        <div className="absolute top-[125%] left-0 w-full p-4 bg-white border rounded-md shadow-lg z-50">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Search;
