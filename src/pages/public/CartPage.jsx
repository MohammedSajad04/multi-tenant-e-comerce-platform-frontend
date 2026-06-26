import { useCart } from "../../context/CartContext";
import Navbar from "../../components/public/Navbar";
import { useNavigate } from "react-router-dom";

function CartPage() {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <>
            <Navbar
                companyName={
                    localStorage.getItem(
                        "company_name"
                    )
                }
            />

            <div className="min-h-screen bg-gray-100 p-10">

                <h1 className="text-5xl font-bold mb-10">
                    Shopping Cart 🛒
                </h1>

                {cartItems.length === 0 ? (

                    <div className="bg-white p-10 rounded-3xl shadow-lg">

                        <h2 className="text-3xl font-bold">
                            Cart Is Empty
                        </h2>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white p-8 rounded-3xl shadow-lg"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-3xl font-bold mb-3">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 mb-3">
                                                ₹ {item.price}
                                            </p>

                                            <div className="flex items-center gap-4">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                    className="bg-gray-300 px-4 py-2 rounded-xl"
                                                >
                                                    -
                                                </button>

                                                <span className="text-2xl font-bold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                    className="bg-gray-300 px-4 py-2 rounded-xl"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="bg-red-500 text-white px-6 py-3 rounded-2xl"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">

                            <h2 className="text-3xl font-bold mb-8">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-6 text-xl">

                                <span>Total</span>

                                <span className="font-bold">
                                    ₹ {totalPrice}
                                </span>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/checkout")
                                }
                                className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
                            >
                                Continue To Checkout
                            </button>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default CartPage;