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

        <aside className="ui-sidebar responsive-sidebar sticky top-0 w-[260px] text-white min-h-screen p-6 flex flex-col justify-between">

            <div>

                <h1 className="text-3xl font-black tracking-tight mb-2">

                    SaaS Platform

                </h1>

                <p className="text-sm text-white/50 mb-10">
                    Business workspace
                </p>

                <div className="flex flex-col gap-3">

                    {menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-5 py-4 rounded-2xl font-semibold transition ${
                                location.pathname === item.path
                                    ? "nav-pill-active"
                                    : "nav-pill"
                            }`}
                        >

                            {item.name}

                        </Link>

                    ))}

                    <button
                        onClick={openStore}
                        className="
                            nav-pill
                            px-5
                            py-4
                            rounded-2xl
                            font-semibold
                            text-left
                            transition
                        "
                    >
                        Open Store
                    </button>

                    {user?.role === "super_admin" && (

                        <Link
                            to="/companies"
                            className={`px-5 py-4 rounded-2xl font-semibold transition ${
                                location.pathname === "/companies"
                                    ? "nav-pill-active"
                                    : "nav-pill"
                            }`}
                        >

                            Companies

                        </Link>

                    )}

                </div>

            </div>

            <div>

                <div className="mb-5 rounded-2xl border border-white/10 bg-white/7 p-4 shadow-inner">

                    <h2 className="font-bold">

                        {user?.username}

                    </h2>

                    <p className="text-white/55 text-sm break-all">

                        {user?.email}

                    </p>

                    <p className="text-xs text-white/35 mt-2 uppercase tracking-widest">

                        {user?.role}

                    </p>

                </div>

                <button
                    onClick={logout}
                    className="w-full rounded-2xl bg-red-500/95 hover:bg-red-500 py-4 font-bold shadow-lg shadow-red-950/20 transition"
                >

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
