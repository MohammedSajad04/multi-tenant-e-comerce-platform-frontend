import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/public/Navbar";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductsPage() {

    const [products, setProducts] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [count, setCount] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [minPrice, setMinPrice] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState("");

    const { addToCart } =
        useCart();

    const { addToWishlist } =
        useWishlist();

    useEffect(() => {

        fetchProducts();

    }, [
        page,
        search,
        category,
        brand,
        minPrice,
        maxPrice
    ]);

    const fetchProducts =
        async () => {

        try {

            const tenantId =
                localStorage.getItem(
                    "tenant_id"
                );

            const response =
                await api.get(
                    `products/list/?tenant=${tenantId}&page=${page}&search=${search}&category=${category}&brand=${brand}&min_price=${minPrice}&max_price=${maxPrice}`
                );

            setProducts(
                response.data.results
            );

            setCount(
                response.data.count
            );

        } catch (error) {

            console.log(error);
        }
    };

    const totalPages =
        Math.ceil(
            count / 12
        );

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar
                companyName={
                    localStorage.getItem(
                        "company_name"
                    )
                }
            />

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-5xl font-bold mb-8">

                    All Products

                </h1>

                {/* FILTERS */}

                <div className="bg-white rounded-3xl p-6 mb-8 shadow">

                    <div className="grid md:grid-cols-5 gap-4">

                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(e)=>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-xl"
                        />

                        <input
                            placeholder="Category"
                            value={category}
                            onChange={(e)=>
                                setCategory(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-xl"
                        />

                        <input
                            placeholder="Brand"
                            value={brand}
                            onChange={(e)=>
                                setBrand(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-xl"
                        />

                        <input
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e)=>
                                setMinPrice(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-xl"
                        />

                        <input
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e)=>
                                setMaxPrice(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-xl"
                        />

                    </div>

                </div>

                {/* PRODUCTS */}

                <div className="grid md:grid-cols-4 gap-6">

                    {products.map(
                        product => (

                        <div
                            key={product.id}
                            className="
                            bg-white
                            rounded-3xl
                            shadow-lg
                            overflow-hidden
                            hover:-translate-y-2
                            transition
                            "
                        >

                            {product.image && (

                                <img
                                    src={`http://127.0.0.1:8000${product.image}`}
                                    alt=""
                                    className="
                                    h-56
                                    w-full
                                    object-cover
                                    "
                                />

                            )}

                            <div className="p-5">

                                <h2 className="font-bold text-xl">

                                    {product.name}

                                </h2>

                                <p className="text-gray-500">

                                    {product.brand}

                                </p>

                                <p className="text-2xl font-bold mt-3">

                                    ₹ {product.price}

                                </p>

                                <div className="flex flex-col gap-2 mt-4">

                                    <button
                                        onClick={() =>
                                            addToWishlist(product)
                                        }
                                        className="
                                        bg-pink-500
                                        text-white
                                        py-2
                                        rounded-xl
                                        "
                                    >
                                        ❤️ Wishlist
                                    </button>

                                    <button
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        className="
                                        bg-green-500
                                        text-white
                                        py-2
                                        rounded-xl
                                        "
                                    >
                                        Add To Cart
                                    </button>

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="
                                        bg-black
                                        text-white
                                        text-center
                                        py-2
                                        rounded-xl
                                        "
                                    >
                                        View
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* PAGINATION */}

                <div className="flex justify-center gap-3 mt-10">

                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                        className="
                        bg-black
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        "
                    >
                        Previous
                    </button>

                    <span className="px-5 py-2">

                        Page {page} of {totalPages}

                    </span>

                    <button
                        disabled={
                            page === totalPages
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                        className="
                        bg-black
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        "
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductsPage;