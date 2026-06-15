import api from "./api";

export const getSubscriptionHistory = async (
    companyId
) => {

    const response = await api.get(
        `tenants/subscription-history/${companyId}/`
    );

    return response.data;
};