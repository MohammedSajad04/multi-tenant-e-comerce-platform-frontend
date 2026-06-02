import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import MyOrdersPage from "../pages/company/MyOrdersPage";
import OrderSuccessPage from "../pages/public/OrderSuccessPage";
import OrdersDashboard from "../pages/dashboard/OrdersDashboard";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/my-orders"
                element={<MyOrdersPage />}
            />

            <Route
                path="/order-success"
                element={<OrderSuccessPage />}
            />

            <Route
                path="/orders"
                element={<OrdersDashboard />}
            />

        </Routes>

    );
}

export default AppRoutes;