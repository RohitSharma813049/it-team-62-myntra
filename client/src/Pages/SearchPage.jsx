import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../Data/Products";
import Card from "../components/Cards/cards";

const SearchPage = () => {
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("query") || "";

  const results = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    return products.filter((p) => {
      return (
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.tags?.some((tag) =>
          tag.toLowerCase().includes(q)
        )
      );
    });
  }, [query, products]);

  return (
    <div className="p-4">

      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4">
        Results for "{query}"
      </h2>

      {/* EMPTY STATE */}
      {!query && (
        <p className="text-gray-500">
          Start typing to search products...
        </p>
      )}

      {query && results.length === 0 && (
        <p className="text-gray-500">
          No products found for "{query}"
        </p>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default SearchPage;