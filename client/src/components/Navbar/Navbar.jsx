import logo from "../../assets/myntra.ico";
import { Helmet } from "react-helmet-async";
import { CiUser, CiHeart } from "react-icons/ci";
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
          Online Shopping For Women,Men,kids,Home,Beauty,Genz,Studio,myntra all
          Products
        </title>
      </Helmet>

      {/* NAVBAR */}
      <nav className="w-full h-16 flex items-center justify-between bg-white px-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 align-middle p-2">
          <div className="md:hidden">
            {/* Mobile Sidebar List */}

            <Mobilelistsidebar />
          </div>

          <Link to="/"> <img src={logo} alt="Logo" className="w-10 h-10 cursor-pointer" /></Link>

          {/* Destop Catogery */}

          <Destopcatogery />
        </div>

        {/* Destop SEARCH */}

        <DestopSearch />

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-xs font-medium">
          
          <DestopProfile/>

          <Link
            to="account/Wishlist"
            className="flex flex-col items-center cursor-pointer"
          >
            <CiHeart className="text-2xl" />
            <span className="hidden md:block">Wishlist</span>
          </Link>

          <Link to="account/cart" className="flex flex-col items-center cursor-pointer">
            <BsBag className="text-2xl" />
            <span className="hidden md:block">Bag</span>
          </Link>
        </div>
      </nav>

      <div className=" bg-white">
        <MobileSearch />
      </div>
    </>
  );
};

export default Navbar;
