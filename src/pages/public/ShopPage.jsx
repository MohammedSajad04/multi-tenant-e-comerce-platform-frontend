import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/public/Navbar";
import FloatingAIButton from "../../components/ai/FloatingAIButton";
import { useWishlist } from "../../context/WishlistContext";


function ShopPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const categories = ["All", "Mobile", "Electronics"];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const tenantId =localStorage.getItem("tenant_id");
            const response = await api.get(
                `products/list/?tenant=${tenantId}&page=1`
            );

            setProducts(
                response.data.results.slice(0, 8)
            );

            setProducts(response.data);
            if (response.data.length > 0) {

            localStorage.setItem(
                "company_name",
                response.data[0].company_name
            );
        }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar
                companyName={
                    localStorage.getItem("company_name")
                }
            />

            {/* 1. FULL SCREEN Tenant Video Banner Space */}
            {/* Moved outside the inner container to stretch edge-to-edge */}
            <div className="w-full h-[85vh] bg-gray-900 relative flex items-center justify-center overflow-hidden shadow-2xl">
                
                {/* NOTE: When you add your <video> tag, apply these classes to it: */}
                {/* <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0" src="..." /> */}
                
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6 z-10 transition-opacity">
                    <span className="text-white/90 text-6xl md:text-8xl mb-6 drop-shadow-lg">▶️</span>
                    <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl mb-4">
                        Your Video Banner Goes Here
                    </h2>
                    <p className="text-gray-200 text-lg md:text-2xl font-light">
                        Experience the best quality products.
                    </p>
                    
                    {/* Bouncing Scroll Indicator */}
                    <div className="absolute bottom-10 animate-bounce flex flex-col items-center text-white/70">
                        <span className="text-sm uppercase tracking-widest font-bold mb-2">Scroll Down</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto p-6 md:p-10 mt-8">
                
                {/* 2. Header, Filter Dropdown, and Search Input */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm w-full lg:w-auto">
                        Explore Products 🔥
                    </h1>

                    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-center justify-end">
                        
                        {/* Dropdown Filter */}
                        <div className="relative w-full sm:w-48 z-40">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-white border border-gray-200 text-gray-800 px-5 py-3.5 rounded-xl shadow-sm hover:border-gray-300 transition-all flex justify-between items-center font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <span>{selectedCategory}</span>
                                <svg className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-3 transition-colors hover:bg-gray-50 ${selectedCategory === category ? 'bg-gray-100 font-bold text-black' : 'text-gray-600'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-72 lg:w-96">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search Products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products
                        .filter((product) => {
                            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
                            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
                            return matchesSearch && matchesCategory;
                        })
                        .map((product) => (
                            <div
                                key={product.id}
                                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group"
                            >
                                <div className="overflow-hidden rounded-xl mb-5 relative bg-gray-50 h-48">
                                    {product.image && (
                                        <img
                                            src={`http://127.0.0.1:8000${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    )}
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-800">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2 truncate" title={product.name}>
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <h1 className="text-2xl font-extrabold text-black mb-5">
                                        ₹ {product.price}
                                    </h1>

                                    <div className="flex flex-col gap-2">

                                        <button
                                            onClick={() =>
                                                addToWishlist(product)
                                            }
                                            className="
                                            w-full
                                            bg-pink-500
                                            text-white
                                            py-2
                                            rounded-xl
                                            hover:bg-pink-600
                                            transition
                                            "
                                        >
                                            ❤️ Wishlist
                                        </button>

                                        <div className="flex gap-2">

                                            <Link
                                                to={`/product/${product.id}`}
                                                className="
                                                flex-1
                                                bg-black
                                                text-white
                                                text-center
                                                py-2
                                                rounded-xl
                                                "
                                            >
                                                View
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    addToCart(product)
                                                }
                                                className="
                                                flex-1
                                                bg-green-500
                                                text-white
                                                py-2
                                                rounded-xl
                                                hover:bg-green-600
                                                "
                                            >
                                                Add To Cart
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="flex justify-center mt-14">

                    <Link
                        to="/products"
                        className="
                        bg-black
                        text-white
                        px-10
                        py-4
                        rounded-2xl
                        text-lg
                        font-bold
                        hover:scale-105
                        transition
                        "
                    >
                        View All Products
                    </Link>

                </div>

            </div>
            <FloatingAIButton />
        </div>
    );
}

export default ShopPage;
