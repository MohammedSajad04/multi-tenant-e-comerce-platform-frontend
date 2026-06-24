import Sidebar from "../components/dashboard/Sidebar";



function DashboardLayout({ children }) {

    return (

        <div className="app-shell responsive-shell flex min-h-screen">

            <Sidebar />



            <main className="app-main responsive-content flex-1 p-6 md:p-10">

                {children}

            </main>

        </div>
    )
}

export default DashboardLayout;
