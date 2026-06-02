import {

    useEffect,
    useState

} from "react";


import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import api from "../../services/api";



function ManageUsersPage() {

    const [users, setUsers] = useState([]);




    useEffect(() => {

        fetchUsers();

    }, []);




    const fetchUsers = async () => {

        try {

            const response = await api.get(

                "accounts/superadmin/users/"
            );



            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };




    const changeRole = async (id, role) => {

        try {

            await api.put(

                `accounts/superadmin/change-role/${id}/`,

                {

                    role
                }
            );



            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };



    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                Manage Users 👨‍💻

            </h1>



            <div className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="py-4">

                                Username

                            </th>


                            <th>

                                Email

                            </th>


                            <th>

                                Role

                            </th>


                            <th>

                                Actions

                            </th>

                        </tr>

                    </thead>



                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {user.username}

                                </td>


                                <td>

                                    {user.email}

                                </td>


                                <td>

                                    {user.role}

                                </td>


                                <td>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() =>
                                                changeRole(
                                                    user.id,
                                                    "customer"
                                                )
                                            }
                                            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                                        >

                                            Customer

                                        </button>



                                        <button
                                            onClick={() =>
                                                changeRole(
                                                    user.id,
                                                    "company_admin"
                                                )
                                            }
                                            className="bg-black text-white px-4 py-2 rounded-xl"
                                        >

                                            Admin

                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </SuperAdminLayout>
    )
}

export default ManageUsersPage;
