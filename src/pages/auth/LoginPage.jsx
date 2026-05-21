import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {

    loginUser,
    getCurrentUser

} from "../../services/authService";


function LoginPage() {

    const [isLogin, setIsLogin] = useState(true);
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({

        name: "",
        username: "",
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

                    username: formData.username,
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

                    console.log(user);

                    alert("Login Success");
                    navigate("/dashboard");


            } catch (error) {

                console.log(error);

                alert("Invalid Credentials");
            }

        } else {

            console.log(formData);

            alert("Register API later");
        }
    };


    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-black to-gray-800 px-5">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

                <div className="flex mb-8 bg-gray-200 rounded-xl overflow-hidden">

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


                <h1 className="text-4xl font-bold text-center mb-8">

                    {isLogin ? "Welcome Back" : "Create Account"}

                </h1>


                <form onSubmit={handleSubmit}>


                    {!isLogin && (

                        <>

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                            />


                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                            />


                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                            />

                        </>

                    )}


                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                    />


                    {!isLogin && (

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none focus:border-black"
                        />

                    )}


                    <button
                        className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
                    >

                        {isLogin ? "Login" : "Register"}

                    </button>

                </form>

            </div>

        </div>
    )
}

export default LoginPage;

