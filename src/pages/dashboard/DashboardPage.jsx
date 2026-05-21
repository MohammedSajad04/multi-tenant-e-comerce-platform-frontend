import { useAuth } from "../../context/AuthContext";


function DashboardPage() {

    const {

        user,
        logout

    } = useAuth();


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="flex justify-between items-center mb-10">

                <h1 className="text-4xl font-bold">

                    Dashboard

                </h1>


                <button
                    onClick={logout}
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >

                    Logout

                </button>

            </div>


            <div className="bg-white p-10 rounded-3xl shadow-xl">

                <h2 className="text-2xl font-bold mb-5">

                    Welcome {user?.username}

                </h2>


                <div className="space-y-3 text-lg">

                    <p>

                        <span className="font-bold">
                            Role:
                        </span>

                        {" "}
                        {user?.role}

                    </p>


                    <p>

                        <span className="font-bold">
                            Tenant:
                        </span>

                        {" "}
                        {user?.tenant}

                    </p>

                </div>

            </div>

        </div>
    )
}

export default DashboardPage;
