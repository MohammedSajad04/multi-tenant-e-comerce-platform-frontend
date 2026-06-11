import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { X } from "lucide-react";

function PlanSelectionPage() {

const navigate = useNavigate();
const [subscription, setSubscription] =
    useState(null);


useEffect(() => {
    fetchSubscription();
}, []);


const fetchSubscription = async () => {

    try {
        const response = await api.get(
    "tenants/subscription/"
        );

        console.log(
            "SUBSCRIPTION DATA:",
            response.data
        );

        setSubscription(
            response.data.subscription
        );
            } catch (error) {
                console.log(error);
            }
    };


const startTrial = async () => {

    try {
        await api.post(
            "tenants/start-trial/"
        );
        alert(
            "Trial Activated Successfully"
        );
        navigate("/dashboard");
    } catch (error) {
        alert(
            error?.response?.data?.error ||
            "Trial Failed"
        );
    }
};

const buyPlan = async (plan) => {

    try {

        const response = await api.post(
            "tenants/create-payment/",
            {
                plan
            }
        );

        const options = {

            key: response.data.key,

            amount: response.data.amount,

            currency: "INR",

            name: "SaaS Platform",

            description: `${plan} Subscription`,

            order_id: response.data.order_id,

            handler: async function (paymentResponse) {

                try {

                    await api.post(
                        "tenants/verify-payment/",
                        {
                            payment_id:
                                response.data.payment_id,

                            razorpay_payment_id:
                                paymentResponse.razorpay_payment_id,

                            razorpay_order_id:
                                paymentResponse.razorpay_order_id,

                            razorpay_signature:
                                paymentResponse.razorpay_signature,
                        }
                    );

                    alert(
                        "Subscription Activated Successfully"
                    );

                    navigate("/subscription");

                } catch (error) {

                    console.log(error);

                    alert(
                        "Payment Verification Failed"
                    );
                }
            },

            theme: {
                color: "#000000"
            }
        };

        const razorpay = new window.Razorpay(
            options
        );

        razorpay.open();

    } catch (error) {

        console.log(error);

        alert(
            error?.response?.data?.error ||
            "Payment Creation Failed"
        );
    }
};

if (!subscription) {

    return (
        <div>
            Loading...
        </div>
    );
}

return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

        <div className="flex justify-end mb-6">

            <button
                onClick={() => navigate("/")}
                className="
                    bg-red-500
                    text-white
                    w-12
                    h-12
                    rounded-full
                    text-2xl
                    font-bold
                "
            >

                ✕

            </button>

            <h1 className="text-5xl font-bold text-center mb-12">

                Choose Your Plan

            </h1>

            <div className="grid md:grid-cols-3 gap-8">

                <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-green-500">

                    <h2 className="text-3xl font-bold mb-4">

                        Monthly

                    </h2>

                    <h1 className="text-5xl font-bold mb-4">

                        ₹499

                    </h1>

                     {!subscription.is_trial_used && (
                        <p className="text-green-600 font-bold mb-4">
                            First Month Free Trial
                        </p>
                    )}

                    <ul className="space-y-3 mb-8">

                        <li>✓ Product Management</li>
                        <li>✓ Orders Management</li>
                        <li>✓ Customer Management</li>
                        <li>✓ Analytics Dashboard</li>
                    </ul>
                    {!subscription.is_trial_used && (
                            <button
                                onClick={startTrial}
                                className="w-full bg-green-600 text-white py-4 rounded-xl mb-3"
                            >
                                Start Trial
                            </button>
                        )}
                    <button
                        onClick={() =>
                            buyPlan(
                                "monthly"
                            )
                        }
                        className="w-full bg-black text-white py-4 rounded-xl"
                    >

                        Buy Monthly

                    </button>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-4">

                        6 Months

                    </h2>

                    <h1 className="text-5xl font-bold mb-4">

                        ₹2499

                    </h1>

                    <ul className="space-y-3 mb-8">

                        <li>✓ Product Management</li>
                        <li>✓ Orders Management</li>
                        <li>✓ Customer Management</li>
                        <li>✓ Analytics Dashboard</li>
                        <li>✓ Priority Support</li>

                    </ul>

                    <button
                        onClick={() =>
                            buyPlan(
                                "six_month"
                            )
                        }
                        className="w-full bg-black text-white py-4 rounded-xl"
                    >

                        Buy 6 Months

                    </button>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-4">

                        Yearly

                    </h2>

                    <h1 className="text-5xl font-bold mb-4">

                        ₹4999

                    </h1>

                    <ul className="space-y-3 mb-8">

                        <li>✓ Product Management</li>
                        <li>✓ Orders Management</li>
                        <li>✓ Customer Management</li>
                        <li>✓ Analytics Dashboard</li>
                        <li>✓ Priority Support</li>
                        <li>✓ Best Value</li>

                    </ul>

                    <button
                        onClick={() =>
                            buyPlan(
                                "yearly"
                            )
                        }
                        className="w-full bg-black text-white py-4 rounded-xl"
                    >

                        Buy Yearly

                    </button>

                </div>

            </div>

        </div>

    </div>
);


}

export default PlanSelectionPage;
