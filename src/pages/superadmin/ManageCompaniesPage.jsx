import {

    useEffect,
    useState

} from "react";


import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import api from "../../services/api";



function ManageCompaniesPage() {

    const [companies, setCompanies] = useState([]);




    useEffect(() => {

        fetchCompanies();

    }, []);




    const fetchCompanies = async () => {

        try {

            const response = await api.get(

                "tenants/superadmin/companies/"
            );



            setCompanies(response.data);

        } catch (error) {

            console.log(error);
        }
    };




    const approveCompany = async (id) => {

        try {

            await api.put(

                `tenants/superadmin/approve/${id}/`
            );



            fetchCompanies();

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Manage Companies 🏢

            </h1>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {companies.map((company) => (

                    <div
                        key={company.id}
                        className="bg-white p-8 rounded-3xl shadow-lg"
                    >

                        <h2 className="text-3xl font-bold mb-4">

                            {company.name}

                        </h2>



                        <p className="text-gray-500 mb-4">

                            {company.description}
                        </p>



                        <div className="mb-6">

                            {company.is_approved ? (

                                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full">

                                    Approved

                                </span>

                            ) : (

                                <span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full">

                                    Pending

                                </span>
                            )}

                        </div>



                        {!company.is_approved && (

                            <button
                                onClick={() =>
                                    approveCompany(company.id)
                                }
                                className="bg-black text-white px-6 py-4 rounded-2xl"
                            >

                                Approve Company

                            </button>
                        )}

                    </div>
                ))}

            </div>

        </SuperAdminLayout>
    )
}

export default ManageCompaniesPage;
