import {useState} from "react";
import {useCart} from "../../context/CartContext";
import {createOrder} from "../../services/productService";
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/public/Navbar";


function CheckoutPage() {

    const {

        cartItems,
        clearCart

    } = useCart();



    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        address: "",
        phone: "",
        payment: "COD",
    });




    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,
        });
    };




    const totalPrice = cartItems.reduce(

        (total, item) =>

            total + item.price * item.quantity,

        0
    );




    const handlePlaceOrder = async () => {

        if (!formData.address || !formData.phone) {

            alert("Please fill all fields");

            return;
        }

        try {

            for (const item of cartItems) {

                await createOrder(

                    item.id,
                    item.quantity
                );
            }


            clearCart();


            alert("Order Placed Successfully 🔥");


            navigate("/order-success");

        } catch (error) {

            console.log(error);

            alert("Order Failed");
        }
    };
    
    if (cartItems.length === 0) {

        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1>No items in cart</h1>
            </div>
        );
    }


    return (
    <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">

                Checkout 💳

            </h1>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


                <div className="bg-white p-10 rounded-3xl shadow-lg">

                    <h2 className="text-3xl font-bold mb-8">

                        Shipping Details

                    </h2>



                    <div className="flex flex-col gap-5">

                        <input
                            type="text"
                            name="address"
                            placeholder="Delivery Address"
                            onChange={handleChange}
                            className="border p-5 rounded-2xl"
                        />


                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className="border p-5 rounded-2xl"
                        />


                        <select
                            name="payment"
                            onChange={handleChange}
                            className="border p-5 rounded-2xl"
                        >

                            <option value="COD">

                                Cash On Delivery

                            </option>


                            <option value="ONLINE">

                                Online Payment

                            </option>

                        </select>

                    </div>

                </div>



                <div className="bg-white p-10 rounded-3xl shadow-lg h-fit">

                    <h2 className="text-3xl font-bold mb-8">

                        Order Summary

                    </h2>



                    <div className="flex flex-col gap-5 mb-8">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="flex justify-between"
                            >

                                <span>

                                    {item.name} x {item.quantity}

                                </span>


                                <span>

                                    ₹ {item.price * item.quantity}

                                </span>

                            </div>
                        ))}

                    </div>



                    <div className="flex justify-between text-2xl font-bold mb-10">

                        <span>Total</span>

                        <span>

                            ₹ {totalPrice}

                        </span>

                    </div>



                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
                    >

                        Place Order

                    </button>

                </div>

            </div>

        </div>
    </>
);
}

export default CheckoutPage;
