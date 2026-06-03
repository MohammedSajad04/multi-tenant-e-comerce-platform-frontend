import {
    useEffect,
    useState
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getCompanyOrders,
    updateOrderStatus
} from "../../services/productService";

function OrdersDashboard() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const data = await getCompanyOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const handleStatusChange = async (

        orderId,
        newStatus

    ) => {

        try {

            await updateOrderStatus(

                orderId,
                newStatus
            );

            fetchOrders();

        } catch (error) {

            console.log(error);

            alert("Failed to update order");
        }
    };

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center min-h-[500px]">

                    <h1 className="text-2xl font-bold">

                        Loading Orders...

                    </h1>

                </div>

            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <div>

                <h1 className="text-4xl font-bold mb-8">

                    Orders Management

                </h1>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="text-left p-4">

                                    Order ID

                                </th>

                                <th className="text-left p-4">

                                    Customer

                                </th>

                                <th className="text-left p-4">

                                    Email

                                </th>

                                <th className="text-left p-4">

                                    Product

                                </th>

                                <th className="text-left p-4">

                                    Quantity

                                </th>

                                <th className="text-left p-4">

                                    Total

                                </th>

                                <th className="text-left p-4">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        #{order.id}

                                    </td>

                                    <td className="p-4">

                                        {order.customer}

                                    </td>

                                    <td className="p-4">

                                        {order.customer_email}

                                    </td>

                                    <td className="p-4">

                                        {order.product}

                                    </td>

                                    <td className="p-4">

                                        {order.quantity}

                                    </td>

                                    <td className="p-4">

                                        ₹ {order.total_price}

                                    </td>

                                    <td className="p-4">

                                        <select

                                            value={order.status}

                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }

                                            className="border border-gray-300 rounded-lg px-3 py-2"
                                        >

                                            <option value="pending">

                                                Pending

                                            </option>

                                            <option value="confirmed">

                                                Confirmed

                                            </option>

                                            <option value="delivered">

                                                Delivered

                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default OrdersDashboard;