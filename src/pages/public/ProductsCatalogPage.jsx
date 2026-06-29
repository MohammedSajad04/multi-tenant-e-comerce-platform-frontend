// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Navbar from "../../components/public/Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { useWishlist } from "../../context/WishlistContext";

// function ProductsPage() {
//     const navigate = useNavigate();

//     const [products, setProducts] =
//         useState([]);

//     const [page, setPage] =
//         useState(1);

//     const [count, setCount] =
//         useState(0);

//     const [search, setSearch] =
//         useState("");

//     const [category, setCategory] =
//         useState("");

//     const [brand, setBrand] =
//         useState("");

//     const [minPrice, setMinPrice] =
//         useState("");

//     const [maxPrice, setMaxPrice] =
//         useState("");

//     const {
//         cartItems,
//         addToCart,
//         removeFromCart,
//         buyNow
//     } = useCart();

//     const {
//         toggleWishlist,
//         isInWishlist
//     } = useWishlist();

//     useEffect(() => {

//         fetchProducts();

//     }, [
//         page,
//         search,
//         category,
//         brand,
//         minPrice,
//         maxPrice
//     ]);

//     const fetchProducts =
//         async () => {

//         try {

//             const tenantId =
//                 localStorage.getItem(
//                     "tenant_id"
//                 );

//             const response =
//                 await api.get(
//                     `products/list/?tenant=${tenantId}&page=${page}&search=${search}&category=${category}&brand=${brand}&min_price=${minPrice}&max_price=${maxPrice}`
//                 );

//             setProducts(
//                 response.data.results
//             );

//             setCount(
//                 response.data.count
//             );

//         } catch (error) {

//             console.log(error);
//         }
//     };

//     const totalPages =
//         Math.ceil(
//             count / 12
//         );


//     return (

//         <div className="min-h-screen bg-slate-100">

//             <Navbar
//                 companyName={
//                     localStorage.getItem(
//                         "company_name"
//                     )
//                 }
//             />

//             <div className="max-w-7xl mx-auto p-8">

//                 <h1 className="text-5xl font-bold mb-8">

//                     All Products

//                 </h1>

//                 {/* FILTERS */}

//                 <div className="bg-white rounded-3xl p-6 mb-8 shadow">

//                     <div className="grid md:grid-cols-5 gap-4">

//                         <input
//                             placeholder="Search..."
//                             value={search}
//                             onChange={(e)=>
//                                 setSearch(
//                                     e.target.value
//                                 )
//                             }
//                             className="border p-3 rounded-xl"
//                         />

//                         <input
//                             placeholder="Category"
//                             value={category}
//                             onChange={(e)=>
//                                 setCategory(
//                                     e.target.value
//                                 )
//                             }
//                             className="border p-3 rounded-xl"
//                         />

//                         <input
//                             placeholder="Brand"
//                             value={brand}
//                             onChange={(e)=>
//                                 setBrand(
//                                     e.target.value
//                                 )
//                             }
//                             className="border p-3 rounded-xl"
//                         />

//                         <input
//                             placeholder="Min Price"
//                             value={minPrice}
//                             onChange={(e)=>
//                                 setMinPrice(
//                                     e.target.value
//                                 )
//                             }
//                             className="border p-3 rounded-xl"
//                         />

//                         <input
//                             placeholder="Max Price"
//                             value={maxPrice}
//                             onChange={(e)=>
//                                 setMaxPrice(
//                                     e.target.value
//                                 )
//                             }
//                             className="border p-3 rounded-xl"
//                         />

//                     </div>

//                 </div>

//                 {/* PRODUCTS */}

//                 <div className="grid md:grid-cols-4 gap-6">

//                     {products.map(
//                         product => {
                            
//                         const inCart = cartItems.some(
//                             item => item.id === product.id
//                         );

//                         return (

//                         <div
//                             key={product.id}
//                             className="
//                             bg-white
//                             rounded-3xl
//                             shadow-lg
//                             overflow-hidden
//                             hover:-translate-y-2
//                             transition
//                             "
//                         >

//                             {product.image && (

//                                 <div className="relative">

//                                     <img
//                                         src={`http://127.0.0.1:8000${product.image}`}
//                                         alt={product.name}
//                                         onClick={() =>
//                                             navigate(`/product/${product.id}`)
//                                         }
//                                         className="
//                                         h-52
//                                         w-full
//                                         object-cover
//                                         cursor-pointer
//                                         hover:scale-105
//                                         duration-300
//                                         transition
//                                         "
//                                     />

//                                     <button
//                                         onClick={() =>
//                                             toggleWishlist(product)
//                                         }
//                                         className="
//                                         absolute
//                                         top-3
//                                         right-3
//                                         bg-white
//                                         rounded-full
//                                         p-3
//                                         shadow-lg
//                                         "
//                                     >
//                                         {
//                                             isInWishlist(product.id)
//                                                 ?
//                                                 "❤️"
//                                                 :
//                                                 "🤍"
//                                         }

//                                     </button>

//                                 </div>

//                             )}

//                             <div className="p-5">

//                                 <h2 className="font-bold text-xl">

//                                     {product.name}

//                                 </h2>

//                                 <p className="text-gray-500">

//                                     {product.brand}

//                                 </p>

//                                 <p className="text-2xl font-bold mt-3">

//                                     ₹ {product.price}

//                                 </p>

//                                 <div className="flex flex-col gap-2 mt-4">

//                                     <button
//                                         onClick={() =>
//                                             toggleWishlist(product)
//                                         }
//                                         className="
//                                         bg-pink-500
//                                         text-white
//                                         py-2
//                                         rounded-xl
//                                         "
//                                     >
//                                         ❤️ Wishlist
//                                     </button>

//                                     <button
//                                         onClick={() =>
//                                             addToCart(product)
//                                         }
//                                         className="
//                                         bg-green-500
//                                         text-white
//                                         py-2
//                                         rounded-xl
//                                         "
//                                     >
//                                         Add To Cart
//                                     </button>

//                                     <Link
//                                         to={`/product/${product.id}`}
//                                         className="
//                                         bg-black
//                                         text-white
//                                         text-center
//                                         py-2
//                                         rounded-xl
//                                         "
//                                     >
//                                         View
//                                     </Link>

//                                 </div>

//                             </div>

//                         </div>

//                     )})}

//                 </div>

//                 {/* PAGINATION */}

//                 <div className="flex justify-center gap-3 mt-10">

//                     <button
//                         disabled={page === 1}
//                         onClick={() =>
//                             setPage(
//                                 page - 1
//                             )
//                         }
//                         className="
//                         bg-black
//                         text-white
//                         px-5
//                         py-2
//                         rounded-xl
//                         "
//                     >
//                         Previous
//                     </button>

//                     <span className="px-5 py-2">

//                         Page {page} of {totalPages}

//                     </span>

//                     <button
//                         disabled={
//                             page === totalPages
//                         }
//                         onClick={() =>
//                             setPage(
//                                 page + 1
//                             )
//                         }
//                         className="
//                         bg-black
//                         text-white
//                         px-5
//                         py-2
//                         rounded-xl
//                         "
//                     >
//                         Next
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ProductsPage;
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/public/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductsPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    
    // Toggle for the dropdown filters
    const [showFilters, setShowFilters] = useState(false);

    const {
        cartItems,
        addToCart,
        removeFromCart,
        buyNow
    } = useCart();

    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();

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

    const fetchProducts = async () => {
        try {
            const tenantId = localStorage.getItem("tenant_id");
            const response = await api.get(
                `products/list/?tenant=${tenantId}&page=${page}&search=${search}&category=${category}&brand=${brand}&min_price=${minPrice}&max_price=${maxPrice}`
            );
            setProducts(response.data.results);
            setCount(response.data.count);
        } catch (error) {
            console.log(error);
        }
    };

    const totalPages = Math.ceil(count / 12);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar companyName={localStorage.getItem("company_name")} />

            <div className="max-w-7xl mx-auto px-6 pt-12">
                
                {/* HEADER & SEARCH SECTION */}
                <div className="flex flex-col items-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 mb-10 tracking-tight text-center">
                        Discover Products
                    </h1>

                    <div className="flex flex-col w-full max-w-3xl gap-4">
                        
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <input
                                    placeholder="Search for products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-8 py-4 rounded-full shadow-sm border border-gray-200 text-lg focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                                />
                            </div>

                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-8 py-4 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Filters
                                <span className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : 'rotate-0'}`}>
                                    ▼
                                </span>
                            </button>
                        </div>

                        {/* EXPANDABLE FILTER PANEL (Underneath Search) */}
                        <div 
                            className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
                                showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                <input
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                                <input
                                    placeholder="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                                <input
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                                <input
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const inCart = cartItems.some(
                            (item) => item.id === product.id
                        );

                        return (
                            <div
                                key={product.id}
                                className="group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl border border-gray-100 flex flex-col hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Image & Wishlist Container */}
                                <div className="relative overflow-hidden rounded-2xl mb-5 bg-gray-100">
                                    {product.image ? (
                                        <img
                                            src={`http://127.0.0.1:8000${product.image}`}
                                            alt={product.name}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            className="h-60 w-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div 
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            className="h-60 w-full flex items-center justify-center text-gray-400 cursor-pointer"
                                        >
                                            No Image
                                        </div>
                                    )}

                                    {/* Wishlist Button - Transparent */}
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className="absolute top-3 right-3 text-2xl p-2 drop-shadow-md hover:scale-125 active:scale-95 transition-all duration-300 z-10 bg-transparent"
                                    >
                                        {isInWishlist(product.id) ? "❤️" : "🤍"}
                                    </button>
                                </div>

                                {/* Content Container */}
                                <div className="px-2 flex-1 flex flex-col">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                                        {product.brand || "Unknown"}
                                    </p>
                                    <h2 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
                                        {product.name}
                                    </h2>
                                    <p className="text-2xl font-black text-gray-900 mt-auto mb-5">
                                        ₹ {product.price}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        
                                        {/* Cart Toggle */}
                                        <button
                                            onClick={() => inCart ? removeFromCart(product.id) : addToCart(product)}
                                            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 ${
                                                inCart 
                                                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                        >
                                            {inCart ? "Remove" : "Cart"}
                                        </button>

                                        {/* Buy Button -> Navigates to Checkout */}
                                        <button
                                            onClick={() => {
                                                if (!inCart) addToCart(product);
                                                navigate("/checkout");
                                            }}
                                            className="px-8 py-3 bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-300 font-bold text-center rounded-xl transition-all duration-300 active:scale-95"
                                        >
                                            Buy
                                        </button>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                {products.length > 0 && (
                    <div className="flex items-center justify-center gap-6 mt-16">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            ← Prev
                        </button>

                        <span className="font-medium text-gray-500">
                            Page <span className="text-black font-bold">{page}</span> of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages || totalPages === 0}
                            onClick={() => setPage(page + 1)}
                            className="bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;