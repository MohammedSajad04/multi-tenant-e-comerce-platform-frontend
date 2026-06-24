function DashboardNavbar({ user }) {

    return (

        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">

            <div>

                <h2 className="eyebrow">

                    Welcome Back 👋

                </h2>


                <h1 className="page-title text-4xl md:text-5xl mt-2">

                    {user?.username}

                </h1>

            </div>



            <div className="surface-card rounded-2xl px-6 py-4">

                <h2 className="relative z-10 font-bold text-lg text-gray-800">

                    {user?.role}

                </h2>

            </div>

        </div>
    )
}

export default DashboardNavbar;
