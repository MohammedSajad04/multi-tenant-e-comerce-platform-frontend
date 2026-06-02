import api from "./api";



export const getProducts = async (tenantId) => {

    const response = await api.get(

        `products/list/?tenant=${tenantId}`
    );

    return response.data;
};

export const getCompanyProducts = async () => {

    const response = await api.get(

        "products/company-products/"
    );

    return response.data;
};



export const createProduct = async (data) => {

    const response = await api.post(

        "products/create/",
        data
    );

    return response.data;
};



export const deleteProduct = async (productId) => {

    const response = await api.delete(

        `products/detail/${productId}/`
    );

    return response.data;
};


export const getCompanyOrders = async () => {

    const response = await api.get(

        "products/company-orders/"
    );

    return response.data;
};



export const getCompanyCustomers = async () => {

    const response = await api.get(

        "products/customers/"
    );

    return response.data;
};

export const createOrder = async (

    productId,
    quantity
) => {

    const response = await api.post(

        `products/order/${productId}/`,

        {
            quantity,
        }
    );

    return response.data;
};


export const updateOrderStatus = async (

    orderId,
    status

) => {

    const response = await api.put(

        `products/update-order/${orderId}/`,

        {
            status
        }
    );

    return response.data;
};
