import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCompany } from "../../services/companyService";

function CompanyRegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    company_name: "",
    owner_name: "",
    company_email: "",
    phone_number: "",
    address: "",
    business_type: "",
    password: "",
    confirm_password: "",
});

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
        formData.confirm_password
    ) {
        alert(
            "Passwords do not match"
        );
        return;
    }

    try {

        await registerCompany(formData);

        alert(
            "Company Registration Submitted Successfully"
        );

        navigate("/");

    } catch (error) {

        console.log(error);

        console.log(
            error.response?.data
        );

        alert(
            JSON.stringify(
                error.response?.data
            )
        );
    }
};

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-gray-800 flex justify-center items-center py-20 px-5">

            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10">

                <h1 className="text-5xl font-bold text-center mb-3">

                    Collaborate With Us

                </h1>

                <p className="text-center text-gray-600 mb-10 text-lg">

                    Create your business platform through SAJAD SaaS

                </p>


                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-5"
                >


                    <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <input
                        type="text"
                        name="owner_name"
                        placeholder="Owner Name"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <input
                        type="email"
                        name="company_email"
                        placeholder="Company Email"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <input
                        type="text"
                        name="address"
                        placeholder="Company Address"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black md:col-span-2"
                    />


                    <select
                        name="business_type"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black md:col-span-2"
                    >

                        <option value="">
                            Select Business Type
                        </option>

                        <option value="ecommerce">
                            Ecommerce
                        </option>

                        <option value="service">
                            Service
                        </option>

                        <option value="hybrid">
                            Hybrid
                        </option>

                    </select>


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
                    />


                    <button
                        className="bg-black text-white py-4 rounded-xl text-lg font-semibold md:col-span-2 hover:bg-gray-800 transition"
                    >

                        Submit Collaboration Request

                    </button>

                </form>

            </div>

        </div>
    )
}

export default CompanyRegisterPage;