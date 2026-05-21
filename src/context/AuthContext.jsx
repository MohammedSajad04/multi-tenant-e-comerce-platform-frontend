
import {

    createContext,
    useContext,
    useEffect,
    useState

} from "react";


import { getCurrentUser } from "../services/authService";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("access");


            if (token) {

                try {

                    const userData = await getCurrentUser();

                    setUser(userData);

                } catch (error) {

                    console.log(error);

                    localStorage.removeItem("access");

                    localStorage.removeItem("refresh");
                }
            }

            setLoading(false);
        };

        fetchUser();

    }, []);



    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        setUser(null);
    };



    return (

        <AuthContext.Provider
            value={{

                user,
                setUser,
                logout,
                loading,
            }}
        >

            {children}

        </AuthContext.Provider>
    )
};



export const useAuth = () => {

    return useContext(AuthContext);
};