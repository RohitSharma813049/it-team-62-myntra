import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";

const MobileBottomNav = () => {
  const navItem =
    "flex flex-col items-center text-[11px] transition-all duration-200 active:scale-90";

  const active = "text-pink-500 font-medium";
  const inactive = "text-gray-600";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 border-t pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16">

        {/* HOME */}
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
        >
          <HiOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>

        {/* OFFERS */}
        <NavLink
          to="/offers"
          aria-label="Offers"
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
        >
          <MdOutlineLocalOffer className="text-xl" />
          <span>Under ₹999</span>
        </NavLink>

        {/* BEAUTY */}
        <NavLink
          to="/beauty"
          aria-label="Beauty"
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
        >
          <GiLipstick className="text-xl" />
          <span>Beauty</span>
        </NavLink>

        {/* PROFILE */}
        <NavLink
          to="/account"
          aria-label="Profile"
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
        >
          <CiUser className="text-xl" />
          <span>Profile</span>
        </NavLink>

      </div>
    </nav>
  );
};

export default MobileBottomNav;