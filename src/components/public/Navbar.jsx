import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ companyName = "SAJAD SHOP" }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="bg-[#0a0a0a] text-white px-6 md:px-10 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md border-b border-gray-800">
            <div className="flex-1 hidden md:block"></div>

            <div className="flex-1 flex justify-start md:justify-center">
                <Link
                    to="/shop"
                    className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase hover:text-gray-300 transition-colors duration-300"
                >
                    {companyName}
                </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-5 md:gap-7">
                <Link
                    to="/wishlist"
                    className="hover:scale-110 hover:text-red-400 transition-all duration-200"
                    title="Wishlist"
                >
                    <svg
                        className="w-6 h-6 md:w-7 md:h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </Link>

                <Link
                    to="/cart"
                    className="hover:scale-110 hover:text-green-400 transition-all duration-200 relative"
                    title="Cart"
                >
                    <svg
                        className="w-6 h-6 md:w-7 md:h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        3
                    </span>
                </Link>

                <Link
                    to="/my-orders"
                    className="hover:scale-110 hover:text-blue-400 transition-all duration-200"
                    title="My Orders"
                >
                    <svg
                        className="w-6 h-6 md:w-7 md:h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                </Link>

                <div className="w-px h-8 bg-gray-700 mx-1"></div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-transparent hover:border-gray-400 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                            alt="Profile"
                            className="w-full h-full object-cover bg-white"
                        />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-2xl py-2 z-50 border border-gray-100">
                            <Link
                                to="/profile-details"
                                onClick={() => setIsProfileOpen(false)}
                                className="block px-5 py-3 hover:bg-gray-100 font-semibold transition-colors"
                            >
                                Details
                            </Link>
                            <hr className="border-gray-100" />
                            <button
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 font-semibold transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

