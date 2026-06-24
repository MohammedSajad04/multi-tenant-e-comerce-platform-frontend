import { useEffect, useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { getSuperAdminDashboardStats } from "../../services/superAdminService";

const initialStats = {
    tenant_count: 0,
    user_count: 0,
    order_count: 0,
    subscription_revenue: 0,
};

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(value) || 0);

function SuperAdminDashboard() {
    const [stats, setStats] = useState(initialStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getSuperAdminDashboardStats();

                setStats({
                    tenant_count: data.tenant_count ?? 0,
                    user_count: data.user_count ?? 0,
                    order_count: data.order_count ?? 0,
                    subscription_revenue: data.subscription_revenue ?? 0,
                });
            } catch (requestError) {
                console.error(requestError);
                setError("Unable to load dashboard statistics.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { label: "Companies", value: stats.tenant_count },
        { label: "Users", value: stats.user_count },
        { label: "Orders", value: stats.order_count },
        {
            label: "Subscription Revenue",
            value: formatCurrency(stats.subscription_revenue),
        },
    ];

    return (
        <SuperAdminLayout>
            <div className="mb-10 animate-enter">
                <p className="eyebrow mb-2">
                    Platform overview
                </p>
                <h1 className="page-title text-4xl md:text-5xl">
                    Platform Dashboard
                </h1>
            </div>

            {error && (
                <p className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-enter-delay">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="stat-card rounded-2xl p-7"
                    >
                        <h2 className="eyebrow mb-4">
                            {card.label}
                        </h2>
                        <p className="page-title text-4xl md:text-5xl">
                            {loading ? "..." : card.value}
                        </p>
                    </div>
                ))}
            </div>
        </SuperAdminLayout>
    );
}

export default SuperAdminDashboard;
