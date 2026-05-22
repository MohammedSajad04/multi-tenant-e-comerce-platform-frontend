import {

    useEffect,
    useState

} from "react";


import DashboardLayout from "../../layouts/DashboardLayout";

import api from "../../services/api";



function UserOrdersPage() {

    const [orders, setOrders] = useState([]);




    useEffect(() => {

        fetchOrders();

    }, []);




    const fetchOrders = async () => {

        try {

            const response = await api.get(

                "products/company-orders/"
            );

            setOrders(response.data);

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <DashboardLayout>

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    My Orders

                </h1>



                <div className="flex flex-col gap-6">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="bg-white p-8 rounded-3xl shadow-lg"
                        >

                            <h2 className="text-3xl font-bold mb-3">

                                {order.product}

                            </h2>


                            <p className="text-gray-500 mb-2">

                                Quantity: {order.quantity}

                            </p>


                            <p className="font-bold mb-3">

                                ₹ {order.total_price}

                            </p>


                            <span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full">

                                {order.status}

                            </span>

                        </div>
                    ))}

                </div>

            </div>

        </DashboardLayout>
    )
}

export default UserOrdersPage;
