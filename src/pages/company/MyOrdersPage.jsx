import { useEffect, useState } from "react";
import axios from "axios";

const MyOrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(

                "http://127.0.0.1:8000/api/products/my-orders/",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="container mt-4">

            <h2>My Orders</h2>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>{order.product}</td>

                            <td>{order.quantity}</td>

                            <td>₹{order.total_price}</td>

                            <td>{order.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default MyOrdersPage;