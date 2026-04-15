import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const DestopSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md flex-[0.6] max-w-2xl mx-4">
      
      {/* SEARCH ICON */}
      <CiSearch
        className="text-xl text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for products, brands and more"
        className="bg-transparent outline-none ml-3 w-full text-sm"
      />

      {/* CLEAR BUTTON */}
      {query && (
        <IoClose
          className="text-gray-500 cursor-pointer text-lg"
          onClick={() => setQuery("")}
        />
      )}
    </div>
  );
};

export default DestopSearch;