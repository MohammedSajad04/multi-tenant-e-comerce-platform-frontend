import { useEffect, useState } from "react";

import api from "../../services/api";

import { Link } from "react-router-dom";



function CompaniesPage() {

    const [companies, setCompanies] = useState([]);



    useEffect(() => {

        fetchCompanies();

    }, []);



    const fetchCompanies = async () => {

        try {

            const response = await api.get(

                "tenants/list/"
            );

            setCompanies(response.data);

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">

                Explore Companies

            </h1>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {companies.map((company) => (

                    <div
                        key={company.id}
                        className="bg-white p-8 rounded-3xl shadow-lg"
                    >

                        <h2 className="text-3xl font-bold mb-4">

                            {company.company_name}

                        </h2>


                        <p className="text-gray-600 mb-4">

                            {company.business_type}

                        </p>


                        <p className="mb-6">

                            {company.address}

                        </p>


                        <Link
                            to={`/company/${company.id}`}
                            className="bg-black text-white px-6 py-3 rounded-xl inline-block"
                        >

                            View Company

                        </Link>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default CompaniesPage;
