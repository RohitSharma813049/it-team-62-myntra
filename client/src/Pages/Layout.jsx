import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "../components/Navbar/Navbarcomponents/MobileBottomNav";
import Footer from "./footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-[70] shadow-md bg-white">
        <div className="max-w-[1400px] w-full mx-auto">
          <Navbar />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 pb-20 min-h-[80vh]">
        <Outlet />
      </main>
      {/* FOOTER (desktop only or general footer) */}
      <Footer />

      {/* MOBILE BOTTOM NAV (NOT footer) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[60]">
        <MobileBottomNav />
      </div>
    </div>
  );
}

export default Layout;
