import { useNavigate } from "react-router-dom";

function OrderSuccessPage() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center">

                <h1 className="text-4xl font-bold mb-4">

                    Order Placed Successfully

                </h1>

                <p className="text-gray-600 mb-8">

                    Your order has been submitted successfully.

                </p>

                <button
                    onClick={() => navigate("/my-orders")}
                    className="bg-black text-white px-8 py-4 rounded-xl"
                >

                    View My Orders

                </button>

            </div>

        </div>
    );
}

export default OrderSuccessPage;