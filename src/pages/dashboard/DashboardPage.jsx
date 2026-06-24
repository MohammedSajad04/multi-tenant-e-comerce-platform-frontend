import { useEffect, useState} from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { getDashboardData} from "../../services/dashboardService";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardStats from "../../components/dashboard/DashboardStats";

function DashboardPage() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        total_products: 0,
        total_orders: 0,
        total_revenue: 0,
        recent_orders: [],
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await getDashboardData();
            setDashboardData(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <div>
               <>
                <DashboardNavbar user={user} />

                <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 shadow-sm mb-6">

                    <h2 className="font-bold text-amber-900">
                        Subscription Status
                    </h2>

                    <p className="text-amber-800">
                        Check your active plan from Subscription page.
                    </p>

                </div>
            </>
                <DashboardStats dashboardData={dashboardData} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="data-card rounded-2xl p-7">
                        <h2 className="page-title text-2xl mb-6">
                            Recent Orders
                        </h2>
                        {dashboardData.recent_orders.length === 0 ? (
                            <p className="text-gray-500">
                                No Orders Yet
                            </p>
                        ) : (
                            dashboardData.recent_orders.map(
                                (order, index) => (

                                    <div
                                        key={index}
                                        className="border-b border-gray-100 py-4 last:border-0"
                                    >

                                        <h2 className="font-bold text-xl">

                                            {order.product}

                                        </h2>


                                        <p className="text-gray-500">

                                            {order.customer}

                                        </p>


                                        <p className="font-bold">

                                            ₹ {order.total_price}

                                        </p>

                                    </div>
                                )
                            )
                        )}

                    </div>



                    <div className="data-card rounded-2xl p-7">

                        <h2 className="page-title text-2xl mb-6">

                            Quick Actions

                        </h2>



                        <div className="flex flex-col gap-5">


                            <button className="primary-action py-4 rounded-2xl font-semibold">

                                Add Product

                            </button>



                            <button className="bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-900/10">

                                View Orders

                            </button>



                            <button className="bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 shadow-lg shadow-green-900/10">

                                Customers

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    )
}

export default DashboardPage;
