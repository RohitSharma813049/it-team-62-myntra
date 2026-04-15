import React from "react";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div className=" md:min-h-screen bg-[#fdebe6] flex items-center justify-center">
      <div className="w-[400px] bg-white shadow-md">

        {/* Banner */}
        <img
          src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2026/FEBRUARY/26/7sTTESIn_3069d7c58f724227946ec2772955333d.png"
          alt="banner"
          className="w-full"
        />

        {/* Dynamic Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;