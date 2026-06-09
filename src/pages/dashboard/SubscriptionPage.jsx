import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function SubscriptionPage() {

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {

        fetchSubscription();

    }, []);

    const fetchSubscription = async () => {

        try {

            const response = await api.get(
                "tenants/subscription/"
            );

            setSubscription(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!subscription) {

        return (
            <DashboardLayout>
                <div className="p-10">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    Subscription

                </h1>

                <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

                    <h2 className="text-3xl font-bold mb-4">

                        Current Plan

                    </h2>

                    <p className="text-xl mb-3">

                        Plan:
                        <span className="font-bold ml-2">
                            {subscription.subscription_plan}
                        </span>

                    </p>

                    <p className="text-xl mb-3">

                        Start:
                        <span className="font-bold ml-2">
                            {subscription.subscription_start}
                        </span>

                    </p>

                    <p className="text-xl">

                        End:
                        <span className="font-bold ml-2">
                            {subscription.subscription_end}
                        </span>

                    </p>

                </div>

                <h2 className="text-3xl font-bold mb-6">

                    Upgrade Plan

                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-8 rounded-3xl shadow-lg">

                        <h2 className="text-2xl font-bold mb-4">

                            Monthly

                        </h2>

                        <h1 className="text-4xl font-bold mb-6">

                            ₹499
                        </h1>

                        <button
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >
                            Buy Now
                        </button>

                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg">

                        <h2 className="text-2xl font-bold mb-4">

                            6 Months

                        </h2>

                        <h1 className="text-4xl font-bold mb-6">

                            ₹2499
                        </h1>

                        <button
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >
                            Buy Now
                        </button>

                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg">

                        <h2 className="text-2xl font-bold mb-4">

                            Yearly

                        </h2>

                        <h1 className="text-4xl font-bold mb-6">

                            ₹4999
                        </h1>

                        <button
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default SubscriptionPage;