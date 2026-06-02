import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import api from "../../services/api";



function CompanyDetailsPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [id]);


    const fetchProducts = async () => {
        try {
            const response = await api.get(
                `products/list/?tenant=${id}`
            );
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-5xl font-bold mb-10">
                Products
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-8 rounded-3xl shadow-lg"
                    >
                        {product.image && (

                            <img
                                src={`http://127.0.0.1:8000${product.image}`}
                                alt={product.name}
                                className="w-full h-56 object-cover rounded-2xl mb-5"
                            />

                        )}

                        <h2 className="text-3xl font-bold mb-4">
                            {product.name}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {product.description}
                        </p>
                        <p className="text-2xl font-bold mb-5">
                            ₹ {product.price}
                        </p>
                        <Link to={`/product/${product.id}`}
                            className="bg-black text-white px-6 py-3 rounded-xl inline-block">
                                View Product
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompanyDetailsPage;
