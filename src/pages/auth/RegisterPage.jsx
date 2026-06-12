import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function RegisterPage() {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    tenant: ""
});


    useEffect(() => {

    fetchCompanies();

}, []);

const fetchCompanies = async () => {

    try {

        const response =
            await api.get(
                "tenants/companies-dropdown/"
            );

        setCompanies(
            response.data
        );

    } catch (error) {

        console.log(error);
    }
};


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    
   const handleSubmit = async (e) => {

    e.preventDefault();

    if (
        formData.password !==
        formData.confirmPassword
    ) {
        alert("Passwords do not match");
        return;
    }

    try {

        await api.post(
            "accounts/register/",
            {
                username:
                    formData.username,

                email:
                    formData.email,

                phone:
                    formData.phone,

                password:
                    formData.password,

                tenant:
                    formData.tenant,
            }
        );

        alert(
            "Registration Successful"
        );

        navigate("/login");

    } catch (error) {

        console.log(
            error.response?.data
        );

        alert(
            error.response?.data?.error ||
            "Registration Failed"
        );
    }
};
    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-slate-950 to-slate-900 px-5">

            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-center mb-8">

                    Create Account

                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full border px-5 py-4 rounded-xl mb-4"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full border px-5 py-4 rounded-xl mb-4"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                        className="w-full border px-5 py-4 rounded-xl mb-4"
                    />
                    <select
                        name="tenant"
                        value={formData.tenant}
                        onChange={handleChange}
                        required
                        className="
                            w-full
                            border
                            px-5
                            py-4
                            rounded-xl
                            mb-4">

                        <option value="">
                            Select Company
                        </option>

                        {companies.map((company) => (
                            <option
                                key={company.id}
                                value={company.id}>
                                {company.company_name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full border px-5 py-4 rounded-xl mb-4"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        className="w-full border px-5 py-4 rounded-xl mb-6"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl font-semibold"
                    >
                        Register
                    </button>

                </form>

                <button
                    onClick={() =>
                        navigate("/login")
                    }
                    className="w-full mt-4 border-2 border-black py-4 rounded-xl font-semibold"
                >
                    Back To Login
                </button>

            </div>

        </div>
    );
}

export default RegisterPage;