import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CustomerRoute({ children }) {

    const { user } = useAuth();

    if (!user) {

        return <Navigate to="/login" />;
    }

    if (
        user.role !== "customer" &&
        user.role !== "company_admin"
    ) {

        return <Navigate to="/" />;
    }

    return children;
}

export default CustomerRoute;