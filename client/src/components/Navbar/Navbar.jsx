import logo from "../../assets/myntra.ico";
import { Helmet } from "react-helmet-async";
import { CiHeart } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import Mobilelistsidebar from "./Navbarcomponents/Mobilelistsidebar";
import MobileSearch from "./Navbarcomponents/MobileSearch";
import Destopcatogery from "./Navbarcomponents/Destopcatogery";
import DestopSearch from "./Navbarcomponents/DestopSearch";
import { Link } from "react-router-dom";
import DestopProfile from "./Navbarcomponents/DestopProfile";

const Navbar = () => {
  return (
    <>
      <Helmet>
        <title>
          Online Shopping For Women, Men, Kids, Home, Beauty | Myntra Clone
        </title>
      </Helmet>

      {/* NAVBAR */}
      <nav className="w-full h-16 sticky top-0 z-50 flex items-center justify-between bg-white px-4  border-b">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Mobilelistsidebar />
          </div>

          {/* LOGO */}
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 cursor-pointer"
            />
          </Link>

          {/* DESKTOP CATEGORY */}
          <Destopcatogery />
        </div>

        {/* SEARCH */}
        <DestopSearch />

        {/* RIGHT */}
        <div className="flex items-center gap-5 text-xs font-medium">

          <DestopProfile />

          {/* WISHLIST */}
          <Link
            to="/account/wishlist"
            className="flex flex-col items-center cursor-pointer hover:text-pink-500 transition"
          >
            <CiHeart className="text-2xl" />
            <span className="hidden md:block">Wishlist</span>
          </Link>

          {/* BAG */}
          <Link
            to="/account/cart"
            className="flex flex-col items-center cursor-pointer hover:text-pink-500 transition"
          >
            <BsBag className="text-2xl" />
            <span className="hidden md:block">Bag</span>
          </Link>
        </div>
      </nav>

      {/* MOBILE SEARCH */}
      <div className="bg-white md:hidden">
        <MobileSearch />
      </div>
    </>
  );
};

export default Navbar;