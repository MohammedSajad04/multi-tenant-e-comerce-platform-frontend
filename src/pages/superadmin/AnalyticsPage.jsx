import { useEffect, useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import api from "../../services/api";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

function AnalyticsPage() {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const response = await api.get(
                "tenants/analytics/"
            );

            setAnalytics(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    if (!analytics) {

        return (

            <SuperAdminLayout>

                <h1 className="text-5xl font-bold">

                    Loading...

                </h1>

            </SuperAdminLayout>
        );
    }

    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Platform Analytics 📊

            </h1>

            {/* TOP CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 mb-3">

                        Total Revenue

                    </h2>

                    <p className="text-4xl font-bold">

                        ₹ {analytics.total_revenue}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 mb-3">

                        Total Companies

                    </h2>

                    <p className="text-4xl font-bold">

                        {analytics.total_companies}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 mb-3">

                        Total Users

                    </h2>

                    <p className="text-4xl font-bold">

                        {analytics.total_users}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 mb-3">

                        Total Orders

                    </h2>

                    <p className="text-4xl font-bold">

                        {analytics.total_orders}

                    </p>

                </div>

            </div>

            {/* REVENUE CHART */}

            <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

                <h2 className="text-3xl font-bold mb-8">

                    Revenue By Month

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart
                        data={analytics.chart_data}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* ORDERS CHART */}

            <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

                <h2 className="text-3xl font-bold mb-8">

                    Orders By Month

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart
                        data={analytics.chart_data}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="orders"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* SUBSCRIPTION CHART */}

            <div className="bg-white p-8 rounded-3xl shadow-lg">

                <h2 className="text-3xl font-bold mb-8">

                    Subscription Growth

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart
                        data={analytics.chart_data}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="subscriptions"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </SuperAdminLayout>
    );
}

export default AnalyticsPage;