import React, { Suspense, lazy } from "react";
import OfferBanner from "../components/Home/Offerpage/Offerpage";
import HeroSlider from "../components/Home/Heropage/Heropage";
import ProductSlider from "../components/Home/ProductsSlider/ProductsSlider";
import { products } from "../Data/Products";

// 🔥 React Icons
import { FaTshirt } from "react-icons/fa";
import { GiDress, GiLipstick } from "react-icons/gi";

const CategoriesSection = lazy(() =>
  import("../components/Home/CategoriesSection/CategoriesSection")
);

const filterBy = (key) =>
  products.filter((p) =>
    p.category?.toLowerCase().includes(key)
  );

const Home = () => {
  return (
    <div className="space-y-6 my-2">

      {/* HERO */}
      <HeroSlider />

      {/* OFFER */}
      <OfferBanner />

      {/* CATEGORIES */}
      <Suspense fallback={<div className="h-24 bg-gray-200 animate-pulse mx-4 rounded" />}>
        <CategoriesSection />
      </Suspense>

      {/* 👕 MEN */}
      <ProductSlider
        title={
          <div className="flex items-center gap-2">
            <FaTshirt className="text-pink-500" />
            Men's Fashion
          </div>
        }
        category="men"
        data={filterBy("men")}
      />

      {/* 👗 WOMEN */}
      <ProductSlider
        title={
          <div className="flex items-center gap-2">
            <GiDress className="text-pink-500" />
            Women's Fashion
          </div>
        }
        category="women"
        data={filterBy("women")}
      />

      {/* 💄 BEAUTY */}
      <ProductSlider
        title={
          <div className="flex items-center gap-2">
            <GiLipstick className="text-pink-500" />
            Beauty Picks
          </div>
        }
        category="beauty"
        data={filterBy("beauty")}
      />

    </div>
  );
};

export default Home;