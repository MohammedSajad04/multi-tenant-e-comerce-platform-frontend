import Sidebar from "../components/dashboard/Sidebar";



function DashboardLayout({ children }) {

    return (

        <div className="flex min-h-screen">

            <Sidebar />



            <div className="flex-1 bg-gray-100 p-10">

                {children}

            </div>

        </div>
    )
}

export default DashboardLayout;
