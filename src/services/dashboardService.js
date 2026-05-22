import api from "./api";



export const getDashboardData = async () => {

    const response = await api.get(

        "products/dashboard/"
    );

    return response.data;
};
