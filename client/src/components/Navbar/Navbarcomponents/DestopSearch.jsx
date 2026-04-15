import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const DestopSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md flex-[0.6] max-w-2xl mx-4">
      <CiSearch className="text-xl text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search for products, brands and more"
        className="bg-transparent outline-none ml-3 w-full text-sm"
      />
    </div>
  );
};

export default DestopSearch;