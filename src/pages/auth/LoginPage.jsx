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

        if (isLogin) {

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

                const user = await getCurrentUser();

                setUser(user);

                alert("Login Success");

                if (isSuperAdmin(user)) {

                    navigate("/super-admin", {
                        replace: true
                    });

                } else if (isCompanyAdmin(user)) {

                    navigate("/dashboard");

                } else if (isCustomer(user)) {

                    navigate("/shop");

                } else {

                    navigate("/");
                }

            } catch (error) {

                console.log(error);

                alert("Invalid Credentials");
            }
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-black via-slate-950 to-slate-800 px-5">

            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6">

                <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">

                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 py-3 font-semibold transition ${
                            isLogin
                                ? "bg-black text-white"
                                : "bg-transparent text-black"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 py-3 font-semibold transition ${
                            !isLogin
                                ? "bg-black text-white"
                                : "bg-transparent text-black"
                        }`}
                    >
                        Register
                    </button>

                </div>

                <h1 className="text-3xl font-bold text-center mb-6">

                    {isLogin
                        ? "Welcome Back"
                        : "Create Account"}

                </h1>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (

                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                            />
                        </>
                    )}

                    {isLogin && (

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                        />

                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                    />

                    {!isLogin && (

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                        />

                    )}

                    <button
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;
