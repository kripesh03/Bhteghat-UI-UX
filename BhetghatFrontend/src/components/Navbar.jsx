import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import footerLogo from "../assets/div.png";

const navigation = [
  { name: "Your Events", href: "/your-events" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    setToast({ show: true, message: "Logout successful!", type: "success" });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white transition-all duration-300 ease-in-out z-50
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      <header className="w-full bg-white shadow-sm border-b px-6 md:px-12">
        <nav className="max-w-screen-2xl mx-auto flex justify-between items-center py-4">
          {/* Left Side - Logo */}
          <Link to="/">
            <img src={footerLogo} alt="Logo" className="w-28 md:w-36" />
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-sm md:text-base font-medium text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/browse">Events</Link>
            <Link to="/admin">Organize Event</Link>
            <Link to="/faq">Contact</Link>
          </div>

          {/* Right Side - Auth or Profile */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-40">
                    <ul className="py-2 text-sm text-gray-700">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
