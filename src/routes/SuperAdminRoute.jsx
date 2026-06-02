import {

    Navigate

} from "react-router-dom";


import {

    useAuth

} from "../context/AuthContext";


import {

    isSuperAdmin

} from "../utils/authRoles";



function SuperAdminRoute({ children }) {

    const { user } = useAuth();



    if (!user) {

        return <Navigate to="/login" />;
    }



    if (!isSuperAdmin(user)) {

        return <Navigate to="/" />;
    }



    return children;
}

export default SuperAdminRoute;
