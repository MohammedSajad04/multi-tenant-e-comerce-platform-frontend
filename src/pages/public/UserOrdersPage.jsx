import {
    useEffect,
    useState
} from "react";

import api from "../../services/api";
import Navbar from "../../components/public/Navbar";

function UserOrdersPage() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await api.get(
                "products/my-orders/"
            );

            setOrders(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-10">

                <h1 className="text-5xl font-bold mb-10">
                    My Orders
                </h1>

                <div className="space-y-6">

                    {orders.length > 0 ? (

                        orders.map((order) => (

                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow p-6"
                            >

                                <h2 className="text-2xl font-bold mb-2">
                                    {order.product_name}
                                </h2>

                                <p className="text-gray-600">
                                    Quantity: {order.quantity}
                                </p>

                                <p className="text-gray-600">
                                    Total: ₹ {order.total_price}
                                </p>

                                <p className="mt-3">
                                    Status:
                                    <span className="ml-2 font-semibold">
                                        {order.status}
                                    </span>
                                </p>

                            </div>

                        ))

                    ) : (

                        <div className="bg-white rounded-2xl p-8 shadow">
                            No Orders Found
                        </div>

                    )}

                </div>

            </div>
        </>
    );
}

export default UserOrdersPage;