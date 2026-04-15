import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../Data/Products";
import Card from "../components/Cards/cards";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery().get("query") || "";

  const results = useMemo(() => {
    if (!query) return [];

    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Results for "{query}"
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
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