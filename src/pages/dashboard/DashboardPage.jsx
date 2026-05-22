import {

    useEffect,
    useState

} from "react";


import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {

    getDashboardData

} from "../../services/dashboardService";


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


                <DashboardNavbar user={user} />


                <DashboardStats dashboardData={dashboardData} />



                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

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
                                        className="border-b py-4"
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



                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Quick Actions

                        </h2>



                        <div className="flex flex-col gap-5">


                            <button className="bg-black text-white py-4 rounded-2xl hover:opacity-90 transition">

                                Add Product

                            </button>



                            <button className="bg-blue-500 text-white py-4 rounded-2xl hover:opacity-90 transition">

                                View Orders

                            </button>



                            <button className="bg-green-500 text-white py-4 rounded-2xl hover:opacity-90 transition">

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
