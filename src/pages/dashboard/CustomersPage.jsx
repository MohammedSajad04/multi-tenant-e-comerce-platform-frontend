import {

    useEffect,
    useState

} from "react";


import DashboardLayout from "../../layouts/DashboardLayout";

import {

    getCompanyCustomers

} from "../../services/productService";



function CustomersPage() {

    const [customers, setCustomers] = useState([]);




    useEffect(() => {

        fetchCustomers();

    }, []);




    const fetchCustomers = async () => {

        try {

            const data = await getCompanyCustomers();

            setCustomers(data);

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <DashboardLayout>

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">

                    Customers

                </h1>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {customers.map((customer) => (

                        <div
                            key={customer.id}
                            className="bg-white p-8 rounded-3xl shadow-lg"
                        >

                            <h2 className="text-3xl font-bold mb-3">

                                {customer.username}

                            </h2>


                            <p className="text-gray-600">

                                {customer.email}

                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </DashboardLayout>
    )
}

export default CustomersPage;
