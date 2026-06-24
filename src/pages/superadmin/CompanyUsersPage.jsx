import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import api from "../../services/api";

function CompanyUsersPage() {

    const { companyId } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get(
                `accounts/superadmin/company-users/${companyId}/`
            );

            setData(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const unblockUser = async (id) => {

        try {

            await api.put(
                `accounts/unblock-user/${id}/`
            );

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    const blockUser = async (id) => {

        try {

            await api.put(
                `accounts/block-user/${id}/`
            );

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    if (!data) {

        return null;
    }

    return (

        <SuperAdminLayout>

            <h1 className="text-5xl font-bold mb-10">

                {data.company_name}

            </h1>

            <div className="bg-white p-8 rounded-3xl shadow-lg">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th className="text-left p-4">
                                Username
                            </th>

                            <th className="text-left p-4">
                                Email
                            </th>

                            <th className="text-left p-4">
                                Role
                            </th>

                            <th className="text-left p-4">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {user.username}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    <div className="flex gap-2 mt-2">

                                        <span
                                            className="
                                                bg-blue-100
                                                text-blue-700
                                                px-2
                                                py-1
                                                rounded-lg
                                                text-xs
                                            "
                                        >
                                            {user.role}
                                        </span>

                                        {user.blocked && (

                                            <span
                                                className="
                                                    bg-red-100
                                                    text-red-700
                                                    px-2
                                                    py-1
                                                    rounded-lg
                                                    text-xs
                                                "
                                            >
                                                Blocked
                                            </span>

                                        )}

                                    </div>
                                </td>

                                <td className="p-4">
                                    {user.blocked ? (

                                        <button
                                            onClick={() =>
                                                unblockUser(user.id)
                                            }
                                            className="
                                                bg-green-600
                                                text-white
                                                px-5
                                                py-2
                                                rounded-xl
                                            "
                                        >
                                            Unblock User
                                        </button>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                blockUser(user.id)
                                            }
                                            className="
                                                bg-red-600
                                                text-white
                                                px-5
                                                py-2
                                                rounded-xl
                                            "
                                        >
                                            Block User
                                        </button>

                                    )}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </SuperAdminLayout>
    );
}

export default CompanyUsersPage;
