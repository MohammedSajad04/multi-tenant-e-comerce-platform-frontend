import api from "./api";


export const loginUser = async (data) => {

    const response = await api.post(
        "accounts/login/",
        data
    );

    return response.data;
};
