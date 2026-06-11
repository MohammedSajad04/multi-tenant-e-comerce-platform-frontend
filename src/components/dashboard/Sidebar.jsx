import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

function Sidebar() {

    const location = useLocation();

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const openStore = () => {

        localStorage.setItem(
            "tenant_id",
            user?.tenant
        );

        localStorage.setItem(
            "company_name",
            user?.tenant_name
        );

        navigate("/shop");
    };

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
        },

        {
            name: "Products",
            path: "/products",
        },

        {
            name: "Orders",
            path: "/orders",
        },

        {
            name: "Customers",
            path: "/customers",
        },

        {
            name: "Subscription",
            path: "/subscription",
        },
    ];

    return (

        <div className="w-[260px] bg-black text-white min-h-screen p-6 flex flex-col justify-between">

            <div>

                <h1 className="text-3xl font-bold mb-10">

                    SaaS Platform

                </h1>

                <div className="flex flex-col gap-3">

                    {menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-5 py-4 rounded-xl transition ${
                                location.pathname === item.path
                                    ? "bg-white text-black"
                                    : "bg-gray-900 hover:bg-gray-800"
                            }`}
                        >

                            {item.name}

                        </Link>

                    ))}

                    <button
                        onClick={openStore}
                        className="
                            px-5
                            py-4
                            rounded-xl
                            bg-gray-900
                            hover:bg-gray-800
                            text-left
                            transition
                        "
                    >
                        Open Store
                    </button>

                    {user?.role === "super_admin" && (

                        <Link
                            to="/companies"
                            className={`px-5 py-4 rounded-xl transition ${
                                location.pathname === "/companies"
                                    ? "bg-white text-black"
                                    : "bg-gray-900 hover:bg-gray-800"
                            }`}
                        >

                            Companies

                        </Link>

                    )}

                </div>

            </div>

            <div>

                <div className="mb-5 bg-gray-900 p-4 rounded-xl">

                    <h2 className="font-bold">

                        {user?.username}

                    </h2>

                    <p className="text-gray-400 text-sm">

                        {user?.email}

                    </p>

                    <p className="text-xs text-gray-500 mt-2">

                        {user?.role}

                    </p>

                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold transition"
                >

                    Logout

                </button>

            </div>

        </div>
    );
}

export default Sidebar;