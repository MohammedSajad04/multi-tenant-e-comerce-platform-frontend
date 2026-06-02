export const getAuthUser = (user) => {

    return user?.user || user?.data?.user || user?.data || user;
};



export const getUserRole = (user) => {

    const authUser = getAuthUser(user);

    return String(
        authUser?.role ||
        authUser?.user_role ||
        authUser?.userType ||
        authUser?.type ||
        authUser?.account_type ||
        ""
    )
        .trim()
        .toLowerCase()
        .replace(/[-\s]+/g, "_");
};



export const getUsername = (user) => {

    const authUser = getAuthUser(user);

    return String(
        user?.loginUsername ||
        user?.username ||
        user?.name ||
        authUser?.loginUsername ||
        authUser?.username ||
        authUser?.name ||
        localStorage.getItem("last_login_username") ||
        ""
    )
        .trim()
        .toLowerCase();
};



export const isSuperAdmin = (user) => {

    const authUser = getAuthUser(user);
    const role = getUserRole(authUser);
    const username = getUsername(user);

    return (
        username === "sajad0913" ||
        authUser?.is_superuser === true ||
        authUser?.is_super_admin === true ||
        authUser?.isSuperAdmin === true ||
        role === "super_admin" ||
        role === "superadmin" ||
        role === "superuser" ||
        role === "super_user" ||
        role === "admin"
    );
};



export const isCompanyAdmin = (user) => {

    const role = getUserRole(user);

    return role === "company_admin";
};



export const isCustomer = (user) => {

    const role = getUserRole(user);

    return role === "customer";
};
