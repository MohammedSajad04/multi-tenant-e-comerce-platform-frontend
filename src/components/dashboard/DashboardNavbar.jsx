function DashboardNavbar({ user }) {

    return (

        <div className="flex justify-between items-center mb-10">

            <div>

                <h2 className="text-2xl text-gray-600">

                    Welcome Back 👋

                </h2>


                <h1 className="text-5xl font-bold mt-2">

                    {user?.username}

                </h1>

            </div>



            <div className="bg-white px-6 py-4 rounded-2xl shadow-lg">

                <h2 className="font-bold text-xl">

                    {user?.role}

                </h2>

            </div>

        </div>
    )
}

export default DashboardNavbar;
