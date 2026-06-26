import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Navbar({ companyName }) {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { cartItems } = useCart();

    const { wishlistItems } = useWishlist();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const wishlistCount = wishlistItems.length;

    const currentCompany =
        companyName ||
        localStorage.getItem("company_name") ||
        "STORE";

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/login";
    };

    return (

        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-5 py-4 text-white backdrop-blur-xl">

            <div className="flex-1 hidden md:block"></div>

            <div className="flex-1 flex justify-start md:justify-center">

                <Link
                    to="/shop"
                    className="text-xl md:text-3xl font-black tracking-widest uppercase hover:text-blue-200 transition"
                >
                    {currentCompany}
                </Link>

            </div>

            <div className="flex-1 flex justify-end items-center gap-5">

                {/* WISHLIST */}

                <Link
                    to="/wishlist"
                    className="relative p-2 hover:scale-110 transition"
                >

                    ❤️

                    {wishlistCount > 0 && (

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">

                            {wishlistCount}

                        </span>

                    )}

                </Link>

                {/* CART */}

                <Link
                    to="/cart"
                    className="relative p-2 hover:scale-110 transition"
                >

                    🛒

                    {cartCount > 0 && (

                        <span className="absolute -top-2 -right-2 bg-green-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">

                            {cartCount}

                        </span>

                    )}

                </Link>

                {/* ORDERS */}

                <Link
                    to="/my-orders"
                    className="p-2 hover:scale-110 transition"
                >
                    📦
                </Link>

                {/* PROFILE */}

                <div className="relative">

                    <button
                        onClick={() =>
                            setIsProfileOpen(
                                !isProfileOpen
                            )
                        }
                        className="w-10 h-10 rounded-full bg-white text-black font-bold"
                    >
                        U
                    </button>

                    {isProfileOpen && (

                        <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-xl">

                            <Link
                                to="/profile-details"
                                className="block px-4 py-3 hover:bg-gray-100"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
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