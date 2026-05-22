import {

    Link,
    useLocation

} from "react-router-dom";


import {

    useAuth

} from "../../context/AuthContext";



function Sidebar() {

    const location = useLocation();

    const { logout, user } = useAuth();




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
            name: "Companies",
            path: "/companies",
        },
    ];



    return (

        <div className="w-[260px] bg-black text-white min-h-screen p-6 flex flex-col justify-between">

            <div>

                <h1 className="text-4xl font-bold mb-12">

                    SAJAD

                </h1>



                <div className="flex flex-col gap-4">

                    {menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-5 py-4 rounded-2xl transition ${
                                location.pathname === item.path
                                    ? "bg-white text-black"
                                    : "bg-gray-900 hover:bg-gray-800"
                            }`}
                        >

                            {item.name}

                        </Link>
                    ))}

                </div>

            </div>



            <div>

                <div className="mb-5 bg-gray-900 p-4 rounded-2xl">

                    <h2 className="font-bold text-xl">

                        {user?.username}

                    </h2>


                    <p className="text-gray-400 text-sm">

                        {user?.email}

                    </p>

                </div>



                <button
                    onClick={logout}
                    className="w-full bg-red-500 py-4 rounded-2xl font-bold"
                >

                    Logout

                </button>

            </div>

        </div>
    )
}

export default Sidebar;
