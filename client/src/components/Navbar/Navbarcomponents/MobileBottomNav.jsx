import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";

const MobileBottomNav = () => {

  const navItem = "flex flex-col items-center text-xs";
  const active = "text-pink-500";
  const inactive = "text-gray-600";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 border-t">
      <div className="flex justify-around items-center h-16">

        {/* HOME */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
        >
          <HiOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>

        {/* UNDER 999 */}
        <NavLink
          to="/offers"
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