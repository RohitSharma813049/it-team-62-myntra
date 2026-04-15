import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/Navbar/Navbarcomponents/MobileBottomNav";
import Footer from "./footer";

function Layout () {
  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-70 shadow-md bg-white">
        <div className="max-w-[1400px] w-full mx-auto">
          <Navbar />
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1440px] w-full mx-auto px-4 pb-20">
        <Outlet />
      </main>

      <footer>
        <Footer/>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <footer className="md:hidden">
        <MobileBottomNav />
      </footer>
    </>
  );
};

export default Layout;
