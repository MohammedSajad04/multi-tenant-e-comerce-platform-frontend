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

            <div className="mb-10 animate-enter">

                <p className="eyebrow mb-2">
                    Company operations
                </p>

                <h1 className="page-title text-4xl md:text-5xl">

                    Manage Companies

                </h1>

                <p className="text-gray-500 mt-3 max-w-2xl">

                    View and manage all companies registered on the platform

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-enter-delay">

                {companies.map((company) => (

                    <div
                        key={company.id}
                        className="data-card group rounded-2xl p-6"
                    >

                        <h2 className="page-title text-2xl mb-2 group-hover:text-blue-700 transition-colors">

                            {company.company_name}

                        </h2>

                        <p className="text-gray-500 mb-5 capitalize">

                            {company.business_type}
                        </p>

                        <span
                            className={`status-pill px-4 py-2 ${
                                company.status === "approved"
                                    ? "bg-green-50 text-green-700 border-green-100"
                                    : company.status === "blocked"
                                    ? "bg-red-50 text-red-700 border-red-100"
                                    : company.status === "rejected"
                                    ? "bg-red-50 text-red-700 border-red-100"
                                    : "bg-amber-50 text-amber-700 border-amber-100"
                            }`}
                        >

                            {company.status}

                        </span>

                        <div className="mt-5">

                            <button
                                onClick={() =>
                                    setSelectedCompany(company)
                                }
                                className="primary-action px-5 py-3 rounded-xl font-semibold"
                            >

                                View Details

                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {selectedCompany && (

                <div className="modal-scrim fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                    <div className="modal-panel bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60">

                        <div className="flex justify-between items-center mb-8">

                            <h2 className="page-title text-3xl">

                                {selectedCompany.company_name}

                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedCompany(null)
                                }
                                className="ghost-action h-10 w-10 rounded-full text-2xl leading-none"
                            >

                                ×

                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">

                            {selectedCompany.status === "pending" && (

                                <>
                                    <button
                                        onClick={() =>
                                            approveCompany(
                                                selectedCompany.id
                                            )
                                        }
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-900/10 hover:bg-green-700"
                                    >

                                        Approve

                                    </button>

                                    <button
                                        onClick={() =>
                                            rejectCompany(
                                                selectedCompany.id
                                            )
                                        }
                                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-900/10 hover:bg-red-700"
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
                                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-900/10 hover:bg-red-700"
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
                                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-900/10 hover:bg-green-700"
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
