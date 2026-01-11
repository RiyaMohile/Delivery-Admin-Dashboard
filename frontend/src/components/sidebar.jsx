import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxes,
  FaUsers,
  FaTruck,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition
     ${isActive
      ? "bg-gray-800 text-yellow-400"
      : "hover:bg-gray-800 hover:text-yellow-400"
    }`;

  return (
    <>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-gray-900 text-white flex items-center justify-between px-4">
        <h2 className="font-bold text-lg">Admin Panel</h2>
        <button onClick={() => setOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>


      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}md:translate-x-0`}>

        <div className="p-5 text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
          Admin Panel
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>


        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/" className={linkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/inventory" className={linkClass}>
            <FaBoxes /> Inventory
          </NavLink>

          <NavLink to="/users" className={linkClass}>
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/drivers" className={linkClass}>
            <FaTruck /> Drivers
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <FaShoppingCart /> Orders
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 border-t border-gray-700">
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
