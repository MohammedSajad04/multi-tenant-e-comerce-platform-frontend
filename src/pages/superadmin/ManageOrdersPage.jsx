import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { getPlatformSubscriptions } from "../../services/superAdminService";

function ManageOrdersPage() {

    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {

        fetchSubscriptions();

    }, []);

    const fetchSubscriptions = async () => {

        try {

            const data =
                await getPlatformSubscriptions();

            setSubscriptions(data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Platform Orders 📦

            </h1>

            <div className="bg-white p-8 rounded-3xl shadow-lg overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">
                                Company
                            </th>

                            <th className="p-4 text-left">
                                Plan
                            </th>

                            <th className="p-4 text-left">
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                Payment Status
                            </th>

                            <th className="p-4 text-left">
                                Start Date
                            </th>

                            <th className="p-4 text-left">
                                Expiry Date
                            </th>

                            <th className="p-4 text-left">
                                Subscription
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {subscriptions.map((sub) => (

                            <tr
                                key={sub.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {sub.company}
                                </td>

                                <td className="p-4">
                                    {sub.plan}
                                </td>

                                <td className="p-4">
                                    ₹ {sub.amount}
                                </td>

                                <td className="p-4">
                                    {sub.payment_status}
                                </td>

                                <td className="p-4">
                                    {sub.subscription_start}
                                </td>

                                <td className="p-4">
                                    {sub.subscription_end}
                                </td>

                                <td className="p-4">

                                    {sub.subscription_status}

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/subscription-history/${sub.company_id}`
                                            )
                                        }
                                    >
                                        View History
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </SuperAdminLayout>
    );
}

export default ManageOrdersPage;
