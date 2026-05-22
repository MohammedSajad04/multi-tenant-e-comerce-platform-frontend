import {

    createContext,
    useContext,
    useState,
    useEffect

} from "react";


import {

    getCurrentUser

} from "../services/authService";



const AuthContext = createContext();



export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);




    useEffect(() => {

        checkUser();

    }, []);




    const checkUser = async () => {

        const token = localStorage.getItem("access");


        if (!token) {

            setLoading(false);

            return;
        }


        try {

            const userData = await getCurrentUser();

            setUser(userData);

        } catch (error) {

            console.log(error);

            localStorage.removeItem("access");

            localStorage.removeItem("refresh");
        }

        setLoading(false);
    };




    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        setUser(null);

        window.location.href = "/login";
    };



    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
            }}
        >

            {!loading && children}

        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext);
