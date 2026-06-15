import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import api from "../../services/api";

function ManageUsersPage() {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);

    useEffect(() => {

        fetchCompanies();

    }, []);

    const fetchCompanies = async () => {

        try {

            const response = await api.get(
                "accounts/superadmin/company-summary/"
            );

            setCompanies(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Company Directory 🏢

            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {companies.map((company) => (

                    <div
                        key={company.id}
                        className="
                            bg-white
                            rounded-3xl
                            shadow-lg
                            p-8
                        "
                    >

                        <h2 className="text-3xl font-bold mb-4">

                            {company.company_name}

                        </h2>

                        <p className="mb-2">

                            <strong>
                                Admin:
                            </strong>

                            {" "}
                            {company.admin}

                        </p>

                        <p className="mb-2">

                            <strong>
                                Users:
                            </strong>

                            {" "}
                            {company.total_users}

                        </p>

                        <p className="mb-6">

                            <strong>
                                Status:
                            </strong>

                            {" "}
                            {company.status}

                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    `/company-users/${company.id}`
                                )
                            }
                            className="
                                bg-black
                                text-white
                                px-6
                                py-3
                                rounded-xl
                            "
                        >

                            View Users

                        </button>

                    </div>

                ))}

            </div>

        </SuperAdminLayout>
    );
}

export default ManageUsersPage;