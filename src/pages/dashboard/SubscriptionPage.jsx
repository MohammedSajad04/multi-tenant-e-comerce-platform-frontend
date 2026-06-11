import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function SubscriptionPage() {

    const [subscription, setSubscription] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        fetchSubscription();

    }, []);

    const fetchSubscription = async () => {

        try {

           const response = await api.get(
                "tenants/subscription/"
            );

            setSubscription(
                response.data.subscription
            );

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

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-5xl font-bold">

                        Subscription

                    </h1>

                    <button
                        onClick={() => navigate("/plans")}
                        className="
                            bg-black
                            text-white
                            px-6
                            py-4
                            rounded-xl
                            hover:bg-gray-800
                            transition
                        "
                    >

                        Upgrade Plan

                    </button>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

                    <h2 className="text-3xl font-bold mb-8">

                        Current Subscription

                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div>

                            <p className="text-gray-500 mb-2">

                                Plan

                            </p>

                            <h2 className="text-2xl font-bold capitalize">

                                {
                                    subscription.subscription_plan ||
                                    "No Active Plan"
                                }

                            </h2>

                        </div>

                        <div>

                            <p className="text-gray-500 mb-2">

                                Days Remaining

                            </p>

                            <h2 className="text-2xl font-bold text-green-600">

                                {
                                    subscription.days_remaining
                                }

                            </h2>

                        </div>

                        <div>

                            <p className="text-gray-500 mb-2">

                                Start Date

                            </p>

                            <h2 className="font-bold text-lg">

                                {
                                    subscription.subscription_start ||
                                    "-"
                                }

                            </h2>

                        </div>

                        <div>

                            <p className="text-gray-500 mb-2">

                                Expiry Date

                            </p>

                            <h2 className="font-bold text-lg">

                                {
                                    subscription.subscription_end ||
                                    "-"
                                }

                            </h2>

                        </div>

                        <div>

                            <p className="text-gray-500 mb-2">

                                Auto Renew

                            </p>

                            <h2
                                className={`font-bold text-lg ${
                                    subscription.auto_renew
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}
                            >

                                {
                                    subscription.auto_renew
                                        ? "Enabled"
                                        : "Disabled"
                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-8">

                        Subscription History

                    </h2>

                    <div className="border rounded-2xl p-5">

                        <div className="flex justify-between">

                            <span className="font-semibold">

                                Current Plan

                            </span>

                            <span className="font-bold capitalize">

                                {
                                    subscription.subscription_plan ||
                                    "None"
                                }

                            </span>

                        </div>

                        <div className="mt-4 text-gray-500">

                            Payment history will appear here
                            after successful subscriptions.

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default SubscriptionPage;