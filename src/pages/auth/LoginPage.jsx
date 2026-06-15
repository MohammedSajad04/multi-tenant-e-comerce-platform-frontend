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

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

                navigate("/super-admin");

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

                        navigate("/dashboard");

                    } else {

                        navigate("/plans");
                    }

                } catch {

                    navigate("/plans");
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

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-slate-950 to-slate-900 px-5">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-center mb-8">

                    Welcome Back

                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-5 py-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-5 py-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                        Login
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-gray-500 mb-4">
                        Don't have an account?
                    </p>

                    <button
                        onClick={() =>
                            navigate("/register")
                        }
                        className="w-full border-2 border-black py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition"
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;