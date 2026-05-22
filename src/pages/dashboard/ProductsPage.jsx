
import {

    useEffect,
    useState

} from "react";


import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {

    getProducts,
    createProduct,
    deleteProduct

} from "../../services/productService";



function ProductsPage() {

    const { user } = useAuth();


    const [products, setProducts] = useState([]);


    const [formData, setFormData] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",
    });



    useEffect(() => {

        if (user?.tenant) {

            fetchProducts();
        }

    }, [user]);



    const fetchProducts = async () => {

        try {

            const data = await getProducts(

                user.tenant
            );

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createProduct(formData);

            fetchProducts();

            setFormData({

                name: "",
                description: "",
                price: "",
                stock: "",
            });

        } catch (error) {

            console.log(error);
        }
    };



    const handleDelete = async (id) => {

        try {

            await deleteProduct(id);

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <DashboardLayout>

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    Product Management

                </h1>



                <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Create Product

                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                        />


                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                        />


                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                        />


                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="border p-4 rounded-xl"
                        />


                        <button
                            className="bg-black text-white py-4 rounded-xl col-span-1 md:col-span-2"
                        >

                            Create Product

                        </button>

                    </form>

                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-3xl shadow-lg"
                        >

                            <h2 className="text-2xl font-bold mb-3">

                                {product.name}

                            </h2>


                            <p className="text-gray-600 mb-3">

                                {product.description}

                            </p>


                            <p className="font-bold text-xl mb-2">

                                ₹ {product.price}

                            </p>


                            <p className="mb-5">

                                Stock: {product.stock}

                            </p>


                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-500 text-white px-5 py-3 rounded-xl"
                            >

                                Delete

                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </DashboardLayout>
    )
}

export default ProductsPage;
