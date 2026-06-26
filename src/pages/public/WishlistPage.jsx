import Navbar from "../../components/public/Navbar";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function WishlistPage() {

    const {
        wishlistItems,
        removeFromWishlist
    } = useWishlist();

    const {
        addToCart
    } = useCart();

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100 p-10">

                <h1 className="text-5xl font-bold mb-10">
                    Wishlist ❤️
                </h1>

                {wishlistItems.length === 0 ? (

                    <div className="bg-white rounded-3xl p-10 shadow">

                        <h2 className="text-2xl font-bold">
                            No Products In Wishlist
                        </h2>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-3 gap-6">

                        {wishlistItems.map(product => (

                            <div
                                key={product.id}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden"
                            >

                                {product.image && (

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-64 w-full object-cover"
                                    />

                                )}

                                <div className="p-5">

                                    <h2 className="text-2xl font-bold">

                                        {product.name}

                                    </h2>

                                    <p className="text-gray-500 mt-2">

                                        ₹ {product.price}

                                    </p>

                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() =>
                                                addToCart(product)
                                            }
                                            className="flex-1 bg-black text-white py-3 rounded-xl"
                                        >
                                            Add To Cart
                                        </button>

                                        <button
                                            onClick={() =>
                                                removeFromWishlist(product.id)
                                            }
                                            className="flex-1 bg-red-500 text-white py-3 rounded-xl"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>
    );
}

export default WishlistPage;