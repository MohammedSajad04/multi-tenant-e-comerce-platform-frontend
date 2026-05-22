import {

    useCart

} from "../../context/CartContext";


import {

    createOrder

} from "../../services/productService";


import {

    useNavigate

} from "react-router-dom";



function CartPage() {

    const {

        cartItems,
        removeFromCart,
        clearCart

    } = useCart();



    const navigate = useNavigate();




    const totalPrice = cartItems.reduce(

        (total, item) =>

            total + item.price * item.quantity,

        0
    );




    const handleCheckout = async () => {

        try {

            for (const item of cartItems) {

                await createOrder(

                    item.id,
                    item.quantity
                );
            }


            clearCart();


            alert("Order Placed Successfully 🔥");


            navigate("/my-orders");

        } catch (error) {

            console.log(error);

            alert("Checkout Failed");
        }
    };



    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">

                My Cart 🛒

            </h1>



            {cartItems.length === 0 ? (

                <div className="bg-white p-10 rounded-3xl shadow-lg">

                    <h2 className="text-3xl font-bold">

                        Cart is Empty

                    </h2>

                </div>

            ) : (

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white p-8 rounded-3xl shadow-lg flex justify-between items-center"
                            >

                                <div>

                                    <h2 className="text-3xl font-bold mb-2">

                                        {item.name}

                                    </h2>


                                    <p className="text-gray-500 mb-2">

                                        Quantity: {item.quantity}

                                    </p>


                                    <h1 className="text-2xl font-bold">

                                        ₹ {item.price}

                                    </h1>

                                </div>



                                <button
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                    className="bg-red-500 text-white px-6 py-3 rounded-2xl"
                                >

                                    Remove

                                </button>

                            </div>
                        ))}

                    </div>



                    <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">

                        <h2 className="text-3xl font-bold mb-8">

                            Checkout

                        </h2>



                        <div className="flex justify-between mb-6 text-xl">

                            <span>Total</span>

                            <span className="font-bold">

                                ₹ {totalPrice}

                            </span>

                        </div>



                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
                        >

                            Place Order

                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}

export default CartPage;
