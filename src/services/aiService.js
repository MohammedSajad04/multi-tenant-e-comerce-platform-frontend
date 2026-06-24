import api from "./api";

export const askAI = async (data) => {

    const response = await api.post(
        "ai/chat/",
        data
    );

    return response.data;
};

export const getChatHistory = async (
    tenantId
) => {

    const response = await api.get(
        `ai/history/${tenantId}/`
    );

    return response.data;
};