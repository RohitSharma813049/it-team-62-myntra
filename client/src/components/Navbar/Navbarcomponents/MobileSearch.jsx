import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { products } from "../../../Data/Products";

const MobileSearch = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(false);

  const navigate = useNavigate();

  // 📦 suggestions (static)
  const suggestions = useMemo(
    () => [
      { name: "T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
      { name: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
      { name: "Jeans", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
      { name: "Kurtas", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990" },
    ],
    []
  );

  // 🔥 better filtering (memoized)
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return products.filter((p) =>
      [p.name, p.brand, p.category, p.subCategory]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q)) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  // ✍️ typing placeholder (safe cleanup)
  useEffect(() => {
    const texts = [
      "Search for products",
      "Search for brands",
      "Search for shoes",
      "Search for t-shirts",
    ];

    let i = 0;
    let char = 0;
    let deleting = false;

    const interval = setInterval(() => {
      const word = texts[i];

      if (!deleting) {
        char++;
        setPlaceholder(word.slice(0, char));
        if (char === word.length) deleting = true;
      } else {
        char--;
        setPlaceholder(word.slice(0, char));
        if (char === 0) {
          deleting = false;
          i = (i + 1) % texts.length;
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // 📜 scroll detection (optimized)
  useEffect(() => {
    const handleScroll = () => {
      if (!openSearch) return;
      setHideSuggestions(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openSearch]);

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setOpenSearch(false);
    setQuery("");
  };

  return (
    <>
      {/* 🔍 SEARCH BAR */}
      <div
        className="md:hidden px-4 mt-2 bg-white"
        onClick={() => setOpenSearch(true)}
      >
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full text-gray-500 text-sm">
          <CiSearch />
          <span>{placeholder || "Search..."}</span>
        </div>
      </div>

      {/* 📦 QUICK SUGGESTIONS */}
      <div className="flex gap-3 px-4 mt-2 md:hidden overflow-x-auto bg-white py-2">
        {!hideSuggestions &&
          suggestions.map((item) => (
            <div
              key={item.name}
              className="min-w-[70px] text-center flex flex-col items-center cursor-pointer active:scale-95 transition"
              onClick={() => {
                navigate(`/search?query=${item.name}`);
                setOpenSearch(false);
              }}
            >
              <img
                src={item.img}
                className="w-14 h-14 rounded-md object-cover"
              />
              <p className="text-xs mt-1">{item.name}</p>
            </div>
          ))}
      </div>

      {/* 🔥 FULL SCREEN SEARCH */}
      {openSearch && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          
          {/* INPUT */}
          <div className="flex items-center gap-3 p-4 border-b">
            <CiSearch className="text-xl" />

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              onClick={() => {
                setOpenSearch(false);
                setQuery("");
              }}
              className="text-sm font-semibold"
            >
              Close
            </button>
          </div>

          {/* RESULTS */}
          <div className="p-4 grid grid-cols-3 gap-4 overflow-y-auto">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="text-center cursor-pointer active:scale-95 transition"
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  setOpenSearch(false);
                }}
              >
                <img
                  src={item.image}
                  className="w-full h-20 object-cover rounded"
                />
                <p className="text-xs mt-1">{item.name}</p>
              </div>
            ))}

            {query && filteredProducts.length === 0 && (
              <p className="text-center col-span-3 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSearch;