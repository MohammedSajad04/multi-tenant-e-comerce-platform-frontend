import {

    useEffect,
    useState

} from "react";


import {

    useParams

} from "react-router-dom";


import api from "../../services/api";

import {

    createOrder

} from "../../services/productService";



function ProductDetailsPage() {

    const { id } = useParams();


    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);




    useEffect(() => {

        fetchProduct();

    }, []);




    const fetchProduct = async () => {

        try {

            const response = await api.get(

                `products/list/?tenant=${id}`
            );


            if (response.data.length > 0) {

                setProduct(response.data[0]);
            }

        } catch (error) {

            console.log(error);
        }
    };



    const handleOrder = async () => {

        try {

            await createOrder(

                product.id,
                quantity
            );

            alert("Order Created Successfully 🔥");

        } catch (error) {

            console.log(error);

            alert("Order Failed");
        }
    };



    if (!product) {

        return (

            <div className="p-10">

                Loading...
            </div>
        )
    }



    return (

        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">

            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">

                <h1 className="text-5xl font-bold mb-6">

                    {product.name}

                </h1>


                <p className="text-gray-600 text-xl mb-6">

                    {product.description}

                </p>


                <h2 className="text-4xl font-bold mb-6">

                    ₹ {product.price}

                </h2>


                <p className="mb-8 text-lg">

                    Stock: {product.stock}

                </p>



                <div className="flex items-center gap-5 mb-8">

                    <label className="text-xl">

                        Quantity
                    </label>


                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                        className="border p-3 rounded-xl w-32"
                    />

                </div>



                <button
                    onClick={handleOrder}
                    className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
                >

                    Buy Now

                </button>

            </div>

        </div>
    )
}

export default ProductDetailsPage;
