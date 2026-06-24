import {

    Link

} from "react-router-dom";



function SuperAdminLayout({ children }) {

    return (

        <div className="app-shell responsive-shell min-h-screen flex">


            <aside className="ui-sidebar responsive-sidebar sticky top-0 w-[280px] min-h-screen text-white p-6 lg:p-8">

                <h1 className="text-3xl font-black mb-3 tracking-tight">

                    Super Admin

                </h1>

                <p className="text-sm text-white/50 mb-10">
                    Platform control center
                </p>


                <div className="flex flex-col gap-3">

                    <Link
                        to="/super-admin"
                        className="nav-pill p-4 rounded-2xl font-semibold"
                    >

                        Dashboard

                    </Link>


                    <Link
                        to="/manage-companies"
                        className="nav-pill p-4 rounded-2xl font-semibold"
                    >

                        Companies

                    </Link>


                    <Link
                        to="/manage-users"
                        className="nav-pill p-4 rounded-2xl font-semibold"
                    >

                        Users

                    </Link>


                    <Link
                        to="/platform-orders"
                        className="nav-pill p-4 rounded-2xl font-semibold"
                    >

                        Orders

                    </Link>


                    <Link
                        to="/analytics"
                        className="nav-pill p-4 rounded-2xl font-semibold"
                    >

                        Analytics

                    </Link>

                </div>

            </aside>



            <main className="app-main responsive-content flex-1 p-6 md:p-10">

                {children}

            </main>

        </div>
    )
}

export default SuperAdminLayout;

