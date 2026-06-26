

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser, getCurrentUser } from "../../services/authService";
import { isSuperAdmin, isCompanyAdmin, isCustomer } from "../../utils/authRoles";
import api from "../../services/api";

function LoginPage() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email: formData.email, password: formData.password });
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            localStorage.removeItem("tenant_id");
            localStorage.removeItem("company_name");
            localStorage.removeItem("role");
            
            const user = await getCurrentUser();
            setUser(user);
            localStorage.setItem(
                "tenant_id",
                user.tenant
            );

            localStorage.setItem(
                "company_name",
                user.tenant_name || ""
            );

            localStorage.setItem(
                "role",
                user.role
            );
            if (isSuperAdmin(user)) navigate("/super-admin");
            else if (isCompanyAdmin(user)) {
                try {
                    const sub = await api.get("tenants/subscription/");
                    if (sub.data.has_active_plan) navigate("/dashboard");
                    else navigate("/plans");
                } catch { navigate("/plans"); }
            } else if (isCustomer(user)) navigate("/shop");
            else navigate("/");
        } catch (error) {
            console.log(error);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black px-5 relative overflow-hidden font-sans">
            
            {/* Subtle Dark Animated Background Vectors */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 border-[1px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] border-[1px] border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

            <div className="relative z-10 bg-zinc-950/90 backdrop-blur-xl w-full max-w-md rounded-[2rem] border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,1)] p-10 transform transition-all duration-500 hover:border-zinc-600 hover:-translate-y-2">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 mb-6 shadow-inner transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <span className="text-3xl text-white">⚿</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-zinc-500 text-sm tracking-widest uppercase">System Authentication</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <input
                            type="email" name="email" placeholder="Email Address" required
                            onChange={handleChange}
                            className="w-full bg-black text-white placeholder-zinc-600 border border-zinc-800 px-5 py-4 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 group-hover:border-zinc-500"
                        />
                    </div>

                    <div className="group">
                        <input
                            type="password" name="password" placeholder="Password" required
                            onChange={handleChange}
                            className="w-full bg-black text-white placeholder-zinc-600 border border-zinc-800 px-5 py-4 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 group-hover:border-zinc-500"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg transform transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-[0.98]"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center space-y-6">
                    <div className="relative flex items-center justify-center">
                        <span className="absolute w-full h-[1px] bg-zinc-800"></span>
                        <span className="relative bg-zinc-950 px-4 text-xs text-zinc-500 tracking-widest uppercase">New Here?</span>
                    </div>

                    <button
                        onClick={() => navigate("/register")}
                        className="w-full border border-zinc-700 text-white py-4 rounded-xl font-bold hover:border-white hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]"
                    >
                        Create an Account
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;