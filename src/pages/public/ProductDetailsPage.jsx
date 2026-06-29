import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart, buyNow } = useCart();

    const {
    toggleWishlist,
    isInWishlist
    } = useWishlist();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        try {

            const response = await api.get(
                `products/detail/${id}/`
            );

            setProduct(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleQuantityChange = (e) => {

        const value = Number(e.target.value);

        if (value < 1) {

            setQuantity(1);

            return;
        }

        if (value > product.stock) {

            setQuantity(product.stock);

            return;
        }

        setQuantity(value);
    };

    const handleAddToCart = () => {

        addToCart({

            ...product,

            quantity: quantity

        });

        navigate("/cart");
    };

    if (!product) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading...

            </div>
        );
    }

    const handleBuyNow = () => {

        buyNow({

            ...product,

            quantity

        });

        navigate("/checkout");

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

            <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm w-full max-w-2xl">

                <div className="relative mb-8">

                    {product.image && (

                        <img

                            src={`http://127.0.0.1:8000${product.image}`}

                            alt={product.name}

                            className="
                            w-full
                            h-96
                            object-cover
                            rounded-2xl
                            cursor-pointer
                            hover:scale-105
                            transition
                            duration-300
                            "

                            onClick={() => navigate(`/product/${product.id}`)}

                        />

                    )}

                    <button

                        onClick={() => toggleWishlist(product)}

                        className="
                        absolute
                        top-4
                        right-4
                        bg-white
                        p-3
                        rounded-full
                        shadow-lg
                        hover:scale-110
                        transition
                        "

                    >

                        {isInWishlist(product.id)

                            ?

                            <FaHeart className="text-red-500 text-2xl"/>

                            :

                            <FaRegHeart className="text-gray-600 text-2xl"/>

                        }

                    </button>

                </div>

                <h1 className="text-4xl font-bold mb-4">

                    {product.name}

                </h1>

                <p className="text-gray-600 mb-6">

                    {product.description}

                </p>

                <h2 className="text-4xl font-bold text-green-600 mb-4">

                    ₹ {product.price}

                </h2>

                <p className="text-lg text-gray-600 mb-8">

                    Available Stock: {product.stock}

                </p>

                <div className="flex items-center gap-4 mb-8">

                    <label className="font-medium">

                        Quantity

                    </label>

                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border border-gray-300 p-3 rounded-xl w-32"
                    />

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">


                    <button

                    onClick={handleAddToCart}

                    className="
                    bg-black
                    text-white
                    py-4
                    rounded-xl
                    font-semibold
                    hover:bg-gray-800
                    transition
                    "

                >

                    Add To Cart

                </button>

                <button

                    onClick={handleBuyNow}

                    className="
                    bg-green-600
                    text-white
                    py-4
                    rounded-xl
                    font-semibold
                    hover:bg-green-700
                    transition
                    "

                >

                    Buy Now

                </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetailsPage;