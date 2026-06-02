import {

    Link

} from "react-router-dom";



function SuperAdminLayout({ children }) {

    return (

        <div className="min-h-screen flex bg-gray-100">


            <div className="w-[280px] bg-black text-white p-8">

                <h1 className="text-4xl font-bold mb-12">

                    SUPER ADMIN

                </h1>



                <div className="flex flex-col gap-5">

                    <Link
                        to="/super-admin"
                        className="bg-gray-900 p-5 rounded-2xl"
                    >

                        Dashboard

                    </Link>


                    <Link
                        to="/manage-companies"
                        className="bg-gray-900 p-5 rounded-2xl"
                    >

                        Companies

                    </Link>


                    <Link
                        to="/manage-users"
                        className="bg-gray-900 p-5 rounded-2xl"
                    >

                        Users

                    </Link>


                    <Link
                        to="/platform-orders"
                        className="bg-gray-900 p-5 rounded-2xl"
                    >

                        Orders

                    </Link>


                    <Link
                        to="/analytics"
                        className="bg-gray-900 p-5 rounded-2xl"
                    >

                        Analytics

                    </Link>

                </div>

            </div>



            <div className="flex-1 p-10">

                {children}

            </div>

        </div>
    )
}

export default SuperAdminLayout;

