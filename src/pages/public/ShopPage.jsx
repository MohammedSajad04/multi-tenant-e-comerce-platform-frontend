import {

    useEffect,
    useState

} from "react";


import {

    Link

} from "react-router-dom";


import api from "../../services/api";

import {

    useCart

} from "../../context/CartContext";



function ShopPage() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");


    const { addToCart } = useCart();




    useEffect(() => {

        fetchProducts();

    }, []);




    const fetchProducts = async () => {

        try {

            const response = await api.get(

                "products/list/?tenant=1"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <div className="min-h-screen bg-gray-100">


            <div className="bg-black text-white p-6 flex justify-between items-center">

                <h1 className="text-4xl font-bold">

                    SAJAD SHOP

                </h1>



                <div className="flex gap-5">

                    <Link
                        to="/cart"
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold"
                    >

                        Cart

                    </Link>


                    <Link
                        to="/my-orders"
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold"
                    >

                        My Orders

                    </Link>

                </div>

            </div>



            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    Explore Products 🔥

                </h1>



                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full border p-5 rounded-2xl mb-10"
                />



                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {products
                        .filter((product) =>
                            product.name
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .map((product) => (

                            <div
                                key={product.id}
                                className="bg-white p-8 rounded-3xl shadow-lg"
                            >

                                <h2 className="text-3xl font-bold mb-4">

                                    {product.name}

                                </h2>


                                <p className="text-gray-500 mb-4">

                                    {product.description}

                                </p>


                                <h1 className="text-4xl font-bold mb-6">

                                    ₹ {product.price}

                                </h1>



                                <div className="flex gap-4">

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="bg-black text-white px-6 py-4 rounded-2xl inline-block"
                                    >

                                        View

                                    </Link>



                                    <button
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        className="bg-green-500 text-white px-6 py-4 rounded-2xl"
                                    >

                                        Add To Cart

                                    </button>

                                </div>

                            </div>
                        ))}

                </div>

            </div>

        </div>
    )
}

export default ShopPage;
