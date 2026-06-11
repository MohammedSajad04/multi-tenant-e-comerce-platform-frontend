import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    loginUser,
    getCurrentUser
} from "../../services/authService";
import {
    isSuperAdmin,
    isCompanyAdmin,
    isCustomer
} from "../../utils/authRoles";
import api from "../../services/api";

function LoginPage() {

    const [isLogin, setIsLogin] = useState(true);

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem(
                "access",
                response.access
            );

            localStorage.setItem(
                "refresh",
                response.refresh
            );

            const user =
                await getCurrentUser();

            setUser(user);

            if (isSuperAdmin(user)) {

                navigate(
                    "/super-admin"
                );

            } else if (
                isCompanyAdmin(user)
            ) {

                try {

                    const sub =
                        await api.get(
                            "tenants/subscription/"
                        );

                    if (
                        sub.data.has_active_plan
                    ) {

                        navigate(
                            "/dashboard"
                        );

                    } else {

                        navigate(
                            "/plans"
                        );
                    }

                } catch {

                    navigate(
                        "/plans"
                    );
                }

            } else if (
                isCustomer(user)
            ) {

                navigate("/shop");

            } else {

                navigate("/");
            }

        } catch (error) {

            console.log(error);

            alert(
                "Invalid Credentials"
            );
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-black via-slate-950 to-slate-800 px-5">

            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6">

                <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">

                    <button
                        onClick={() =>
                            setIsLogin(true)
                        }
                        className={`w-1/2 py-3 font-semibold ${
                            isLogin
                                ? "bg-black text-white"
                                : ""
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() =>
                            setIsLogin(false)
                        }
                        className={`w-1/2 py-3 font-semibold ${
                            !isLogin
                                ? "bg-black text-white"
                                : ""
                        }`}
                    >
                        Register
                    </button>

                </div>

                <h1 className="text-3xl font-bold text-center mb-6">

                    Login

                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        className="w-full border px-4 py-3 rounded-lg mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full border px-4 py-3 rounded-lg mb-4"
                    />

                    <button
                        className="w-full bg-black text-white py-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;