import api from "./api";

export const getSuperAdminDashboardStats = async () => {
    const response = await api.get("tenants/superadmin/dashboard/");

    return response.data;
};


export const getPlatformSubscriptions = async () => {

    const response = await api.get(
        "tenants/platform-subscriptions/"
    );

    return response.data;
};