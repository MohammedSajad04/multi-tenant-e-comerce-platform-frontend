import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";

function ProductDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

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

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

            <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm w-full max-w-2xl">

                <h1 className="text-4xl font-bold mb-4">

                    {product.name}

                </h1>

                <p className="text-gray-600 mb-6">

                    {product.description}

                </p>

                <h2 className="text-3xl font-bold mb-4">

                    ₹ {product.price}

                </h2>

                <p className="text-gray-500 mb-8">

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

                <div className="flex gap-4">

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
                    >

                        Add To Cart

                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="flex-1 border border-black py-4 rounded-xl hover:bg-gray-100 transition"
                    >

                        View Cart

                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetailsPage;