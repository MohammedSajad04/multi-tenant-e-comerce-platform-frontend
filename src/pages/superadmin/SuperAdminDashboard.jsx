import SuperAdminLayout from "../../layouts/SuperAdminLayout";



function SuperAdminDashboard() {

    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Platform Dashboard 🚀

            </h1>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 text-xl mb-4">

                        Companies

                    </h2>

                    <h1 className="text-5xl font-bold">

                        12

                    </h1>

                </div>



                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 text-xl mb-4">

                        Users

                    </h2>

                    <h1 className="text-5xl font-bold">

                        245

                    </h1>

                </div>



                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 text-xl mb-4">

                        Orders

                    </h2>

                    <h1 className="text-5xl font-bold">

                        532

                    </h1>

                </div>



                <div className="bg-white p-8 rounded-3xl shadow-lg">

                    <h2 className="text-gray-500 text-xl mb-4">

                        Revenue

                    </h2>

                    <h1 className="text-5xl font-bold">

                        ₹ 12L

                    </h1>

                </div>

            </div>

        </SuperAdminLayout>
    )
}

export default SuperAdminDashboard;
