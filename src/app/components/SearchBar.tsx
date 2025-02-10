"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search posts..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSearch}
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
