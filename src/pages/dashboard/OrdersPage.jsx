import {

    useEffect,
    useState

} from "react";


import DashboardLayout from "../../layouts/DashboardLayout";

import {

    getCompanyOrders

} from "../../services/productService";



function OrdersPage() {

    const [orders, setOrders] = useState([]);




    useEffect(() => {

        fetchOrders();

    }, []);




    const fetchOrders = async () => {

        try {

            const data = await getCompanyOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <DashboardLayout>

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    Orders Management

                </h1>



                <div className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="py-4">
                                    Customer
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Total
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            {orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-b"
                                >

                                    <td className="py-4">

                                        {order.customer}

                                    </td>


                                    <td>

                                        {order.customer_email}

                                    </td>


                                    <td>

                                        {order.product}

                                    </td>


                                    <td>

                                        {order.quantity}

                                    </td>


                                    <td>

                                        ₹ {order.total_price}

                                    </td>


                                    <td>

                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">

                                            {order.status}

                                        </span>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    )
}

export default OrdersPage;
