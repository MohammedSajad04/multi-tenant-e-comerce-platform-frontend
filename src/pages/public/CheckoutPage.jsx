// import {useState} from "react";
// import {useCart} from "../../context/CartContext";
// import {
//     createOrder,
//     createOrderPayment,
//     verifyOrderPayment
// } from "../../services/productService";import {useNavigate} from "react-router-dom";
// import Navbar from "../../components/public/Navbar";


// function CheckoutPage() {

//     const {

//         cartItems,
//         clearCart

//     } = useCart();



//     const navigate = useNavigate();



//     const [formData, setFormData] = useState({

//         address: "",
//         phone: "",
//         payment: "COD",
//     });




//     const handleChange = (e) => {

//         setFormData({

//             ...formData,

//             [e.target.name]: e.target.value,
//         });
//     };




//     const totalPrice = cartItems.reduce(

//         (total, item) =>

//             total + item.price * item.quantity,

//         0
//     );




//         const handlePlaceOrder = async () => {

//             try {

//                 const firstItem = cartItems[0];

//                 const order = await createOrder(
//                     firstItem.id,
//                     firstItem.quantity
//                 );

//                 const payment =
//                     await createOrderPayment(
//                         order.id
//                     );

//                 const options = {

//                     key: payment.key,

//                     amount: payment.amount,

//                     currency: "INR",

//                     order_id: payment.order_id,

//                     name: "SAJAD SHOP",

//                     handler: async function (
//                         response
//                     ) {

//                         await verifyOrderPayment({

//                             db_order_id:
//                                 payment.db_order_id,

//                             razorpay_payment_id:
//                                 response.razorpay_payment_id,

//                             razorpay_order_id:
//                                 response.razorpay_order_id,

//                             razorpay_signature:
//                                 response.razorpay_signature,
//                         });

//                         clearCart();

//                         alert(
//                             "Payment Successful"
//                         );

//                         navigate(
//                             "/my-orders"
//                         );
//                     }
//                 };

//                 const razorpay =
//                     new window.Razorpay(
//                         options
//                     );

//                 razorpay.open();

//             } catch (error) {

//                 console.log(error);

//                 alert(
//                     error.response?.data?.error ||
//                     "Payment Failed"
//                 );
//             }
//     };
    
//     if (cartItems.length === 0) {

//         return (
//             <div className="min-h-screen flex justify-center items-center">
//                 <h1>No items in cart</h1>
//             </div>
//         );
//     }


//     return (
//     <>
//         <Navbar />

//         <div className="min-h-screen bg-gray-100 p-10">

//             <h1 className="text-5xl font-bold mb-10">

//                 Checkout 💳

//             </h1>



//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


//                 <div className="bg-white p-10 rounded-3xl shadow-lg">

//                     <h2 className="text-3xl font-bold mb-8">

//                         Shipping Details

//                     </h2>



//                     <div className="flex flex-col gap-5">

//                         <input
//                             type="text"
//                             name="address"
//                             placeholder="Delivery Address"
//                             onChange={handleChange}
//                             className="border p-5 rounded-2xl"
//                         />


//                         <input
//                             type="text"
//                             name="phone"
//                             placeholder="Phone Number"
//                             onChange={handleChange}
//                             className="border p-5 rounded-2xl"
//                         />


//                         <select
//                             name="payment"
//                             onChange={handleChange}
//                             className="border p-5 rounded-2xl"
//                         >

//                             <option value="COD">

//                                 Cash On Delivery

//                             </option>


//                             <option value="ONLINE">

//                                 Online Payment

//                             </option>

//                         </select>

//                     </div>

//                 </div>



//                 <div className="bg-white p-10 rounded-3xl shadow-lg h-fit">

//                     <h2 className="text-3xl font-bold mb-8">

//                         Order Summary

//                     </h2>



//                     <div className="flex flex-col gap-5 mb-8">

//                         {cartItems.map((item) => (

//                             <div
//                                 key={item.id}
//                                 className="flex justify-between"
//                             >

//                                 <span>

//                                     {item.name} x {item.quantity}

//                                 </span>


//                                 <span>

//                                     ₹ {item.price * item.quantity}

//                                 </span>

//                             </div>
//                         ))}

//                     </div>



//                     <div className="flex justify-between text-2xl font-bold mb-10">

//                         <span>Total</span>

//                         <span>

//                             ₹ {totalPrice}

//                         </span>

//                     </div>



//                     <button
//                         onClick={handlePlaceOrder}
//                         className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
//                     >

//                         Place Order

//                     </button>

//                 </div>

//             </div>

//         </div>
//     </>
// );
// }

// export default CheckoutPage;


import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
    createOrder,
    createOrderPayment,
    verifyOrderPayment
} from "../../services/productService";
import { useNavigate } from "react-router-dom";
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
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        try {
            const firstItem = cartItems[0];
            const order = await createOrder(
                firstItem.id,
                firstItem.quantity
            );
            const payment = await createOrderPayment(
                order.id
            );
            const options = {
                key: payment.key,
                amount: payment.amount,
                currency: "INR",
                order_id: payment.order_id,
                name: "SAJAD SHOP",
                handler: async function (response) {
                    await verifyOrderPayment({
                        db_order_id: payment.db_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    });
                    clearCart();
                    alert("Payment Successful");
                    navigate("/my-orders");
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.error || "Payment Failed"
            );
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                    <span className="text-6xl mb-4">🛒</span>
                    <h1 className="text-3xl font-bold text-gray-800">Your cart is empty</h1>
                    <button 
                        onClick={() => navigate("/products")}
                        className="mt-6 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-6 md:p-10 pb-20">
                <div className="max-w-7xl mx-auto">
                    
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 mb-12 tracking-tight">
                        Checkout 💳
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* SHIPPING DETAILS FORM */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-fit">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">
                                Shipping Details
                            </h2>

                            <div className="flex flex-col gap-6">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Delivery Address"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-lg"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-lg"
                                />

                                <select
                                    name="payment"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-lg cursor-pointer appearance-none"
                                >
                                    <option value="COD">Cash On Delivery (COD)</option>
                                    <option value="ONLINE">Online Payment (Razorpay)</option>
                                </select>
                            </div>
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-fit flex flex-col">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-5 mb-8 flex-1 overflow-y-auto max-h-96 pr-2">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-lg text-gray-900">
                                                {item.name}
                                            </span>
                                            <span className="text-sm text-gray-500 font-medium">
                                                Qty: {item.quantity}
                                            </span>
                                        </div>
                                        <span className="font-black text-xl text-gray-900">
                                            ₹ {item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-auto">
                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-2xl text-gray-500 font-bold">Total Amount</span>
                                    <span className="text-4xl font-black text-gray-900">
                                        ₹ {totalPrice}
                                    </span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-300 transition-all duration-300 active:scale-95"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;