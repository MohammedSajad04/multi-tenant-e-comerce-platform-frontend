function DashboardStats({ dashboardData }) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


            <div className="stat-card rounded-2xl p-7">

                <h2 className="eyebrow mb-3">

                    Total Products

                </h2>


                <h1 className="page-title text-4xl md:text-5xl">

                    {dashboardData.total_products}

                </h1>

            </div>



            <div className="stat-card rounded-2xl p-7">

                <h2 className="eyebrow mb-3">

                    Total Orders

                </h2>


                <h1 className="page-title text-4xl md:text-5xl">

                    {dashboardData.total_orders}

                </h1>

            </div>



            <div className="stat-card rounded-2xl p-7">

                <h2 className="eyebrow mb-3">

                    Revenue

                </h2>


                <h1 className="page-title text-4xl md:text-5xl">

                    ₹ {dashboardData.total_revenue}

                </h1>

            </div>

        </div>
    )
}

export default DashboardStats;
