import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-black text-white px-10 py-5 flex justify-between items-center">

            <Link
                to="/shop"
                className="text-4xl font-bold"
            >
                SAJAD SHOP
            </Link>

            <div className="flex gap-4">

                <Link
                    to="/cart"
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
                >
                    Cart
                </Link>

                <Link
                    to="/my-orders"
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
                >
                    My Orders
                </Link>

            </div>

        </nav>

    );
}

export default Navbar;
