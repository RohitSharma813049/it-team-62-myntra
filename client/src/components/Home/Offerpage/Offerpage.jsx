import React from "react";

const OfferBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 py-3 px-3 md:px-4 flex justify-center">

      <div className="max-w-[1200px] w-full cursor-pointer overflow-hidden rounded-lg group">

        <img
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2026/APRIL/12/XC10hxBQ_0180d5dccc7e4308bd4b44cefdaca489.png"
          alt="Offer Banner"
          loading="lazy"
          className="w-full h-auto object-cover rounded-lg 
                     transition duration-300 group-hover:scale-[1.02]"
        />

      </div>

    </div>
  );
};

export default OfferBanner;