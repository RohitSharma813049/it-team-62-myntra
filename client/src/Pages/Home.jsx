import React from "react";
import OfferBanner from "../components/Home/Offerpage/Offerpage";
import HeroSlider from "../components/Home/Heropage/Heropage";
import ProductSlider from "../components/Home/ProductsSlider/ProductsSlider";
import { products } from "../Data/Products";

const Home = () => {
  return (
    <>
      <div className="space-y-6 my-2">
        <OfferBanner />
        <HeroSlider />
        <ProductSlider data={products} />
      </div>
    </>
  );
};

export default Home;
