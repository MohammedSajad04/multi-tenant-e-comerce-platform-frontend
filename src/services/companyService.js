import api from "./api";

export const registerCompany = async (data) => {

    const response = await api.post(
        "tenants/register/",
        data
    );

    return response.data;
};