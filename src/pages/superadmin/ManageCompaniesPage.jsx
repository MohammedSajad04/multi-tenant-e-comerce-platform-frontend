import {
    useEffect,
    useState
} from "react";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import api from "../../services/api";

function ManageCompaniesPage() {

    const [companies, setCompanies] = useState([]);

    const [selectedCompany, setSelectedCompany] = useState(null);

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

            setSelectedCompany(null);

        } catch (error) {

            console.log(error);
        }
    };

    const rejectCompany = async (id) => {

        try {

            await api.put(
                `tenants/superadmin/reject/${id}/`
            );

            fetchCompanies();

            setSelectedCompany(null);

        } catch (error) {

            console.log(error);
        }
    };

    const blockCompany = async (id) => {

        try {

            await api.put(
                `tenants/superadmin/block/${id}/`
            );

            fetchCompanies();

            setSelectedCompany(null);

        } catch (error) {

            console.log(error);
        }
    };

    const unblockCompany = async (id) => {

        try {

            await api.put(
                `tenants/superadmin/unblock/${id}/`
            );

            fetchCompanies();

            setSelectedCompany(null);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <SuperAdminLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Manage Companies

                </h1>

                <p className="text-gray-500 mt-2">

                    View and manage all companies registered on the platform

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {companies.map((company) => (

                    <div
                        key={company.id}
                        className="bg-white rounded-2xl shadow p-6 border"
                    >

                        <h2 className="text-2xl font-bold mb-2">

                            {company.company_name}

                        </h2>

                        <p className="text-gray-500 mb-3">

                            {company.business_type}
                        </p>

                        <span
                            className={`px-4 py-2 rounded-full text-sm ${
                                company.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : company.status === "blocked"
                                    ? "bg-red-100 text-red-700"
                                    : company.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >

                            {company.status}

                        </span>

                        <div className="mt-5">

                            <button
                                onClick={() =>
                                    setSelectedCompany(company)
                                }
                                className="bg-black text-white px-5 py-3 rounded-xl"
                            >

                                View Details

                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {selectedCompany && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white w-[750px] rounded-3xl p-8">

                        <div className="flex justify-between items-center mb-8">

                            <h2 className="text-3xl font-bold">

                                {selectedCompany.company_name}

                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedCompany(null)
                                }
                                className="text-3xl"
                            >

                                ×

                            </button>

                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p className="font-semibold">

                                    Owner

                                </p>

                                <p>

                                    {selectedCompany.owner_name}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Email

                                </p>

                                <p>

                                    {selectedCompany.company_email}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Phone

                                </p>

                                <p>

                                    {selectedCompany.phone_number}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Business Type

                                </p>

                                <p>

                                    {selectedCompany.business_type}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Registration

                                </p>

                                <p>

                                    {selectedCompany.registration_number}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Status

                                </p>

                                <p>

                                    {selectedCompany.status}

                                </p>

                            </div>

                        </div>

                        <div className="mt-6">

                            <p className="font-semibold mb-2">

                                Address

                            </p>

                            <p>

                                {selectedCompany.address}

                            </p>

                        </div>

                        <div className="mt-6">

                            <p className="font-semibold mb-2">

                                Description

                            </p>

                            <p>

                                {selectedCompany.company_description}

                            </p>

                        </div>

                        <div className="mt-6">

                            <p className="font-semibold mb-2">

                                Modules

                            </p>

                            <p>

                                {selectedCompany.modules?.join(", ")}

                            </p>

                        </div>

                        <div className="flex gap-4 mt-8">

                            {selectedCompany.status === "pending" && (

                                <>
                                    <button
                                        onClick={() =>
                                            approveCompany(
                                                selectedCompany.id
                                            )
                                        }
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl"
                                    >

                                        Approve

                                    </button>

                                    <button
                                        onClick={() =>
                                            rejectCompany(
                                                selectedCompany.id
                                            )
                                        }
                                        className="bg-red-600 text-white px-6 py-3 rounded-xl"
                                    >

                                        Reject

                                    </button>
                                </>
                            )}

                            {selectedCompany.status === "approved" && (

                                <button
                                    onClick={() =>
                                        blockCompany(
                                            selectedCompany.id
                                        )
                                    }
                                    className="bg-red-600 text-white px-6 py-3 rounded-xl"
                                >

                                    Block Company

                                </button>
                            )}

                            {selectedCompany.status === "blocked" && (

                                <button
                                    onClick={() =>
                                        unblockCompany(
                                            selectedCompany.id
                                        )
                                    }
                                    className="bg-green-600 text-white px-6 py-3 rounded-xl"
                                >

                                    Unblock Company

                                </button>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </SuperAdminLayout>
    );
}

export default ManageCompaniesPage;