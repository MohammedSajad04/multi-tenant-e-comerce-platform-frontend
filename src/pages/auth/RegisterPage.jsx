// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function RegisterPage() {

//     const navigate = useNavigate();
//     const [companies, setCompanies] = useState([]);
//     const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     tenant: ""
// });


//     useEffect(() => {

//     fetchCompanies();

// }, []);

// const fetchCompanies = async () => {

//     try {

//         const response =
//             await api.get(
//                 "tenants/companies-dropdown/"
//             );

//         setCompanies(
//             response.data
//         );

//     } catch (error) {

//         console.log(error);
//     }
// };


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

    
//    const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (
//         formData.password !==
//         formData.confirmPassword
//     ) {
//         alert("Passwords do not match");
//         return;
//     }

//     try {

//         await api.post(
//             "accounts/register/",
//             {
//                 username:
//                     formData.username,

//                 email:
//                     formData.email,

//                 phone:
//                     formData.phone,

//                 password:
//                     formData.password,

//                 tenant:
//                     formData.tenant,
//             }
//         );

//         alert(
//             "Registration Successful"
//         );

//         navigate("/login");

//     } catch (error) {

//         console.log(
//             error.response?.data
//         );

//         alert(
//             error.response?.data?.error ||
//             "Registration Failed"
//         );
//     }
// };
//     return (

//         <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-slate-950 to-slate-900 px-5">

//             <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">

//                 <h1 className="text-4xl font-bold text-center mb-8">

//                     Create Account

//                 </h1>

//                 <form onSubmit={handleSubmit}>

//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         onChange={handleChange}
//                         required
//                         className="w-full border px-5 py-4 rounded-xl mb-4"
//                     />

//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         onChange={handleChange}
//                         required
//                         className="w-full border px-5 py-4 rounded-xl mb-4"
//                     />

//                     <input
//                         type="text"
//                         name="phone"
//                         placeholder="Phone Number"
//                         onChange={handleChange}
//                         required
//                         className="w-full border px-5 py-4 rounded-xl mb-4"
//                     />
//                     <select
//                         name="tenant"
//                         value={formData.tenant}
//                         onChange={handleChange}
//                         required
//                         className="
//                             w-full
//                             border
//                             px-5
//                             py-4
//                             rounded-xl
//                             mb-4">

//                         <option value="">
//                             Select Company
//                         </option>

//                         {companies.map((company) => (
//                             <option
//                                 key={company.id}
//                                 value={company.id}>
//                                 {company.company_name}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         required
//                         className="w-full border px-5 py-4 rounded-xl mb-4"
//                     />

//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         placeholder="Confirm Password"
//                         onChange={handleChange}
//                         required
//                         className="w-full border px-5 py-4 rounded-xl mb-6"
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-black text-white py-4 rounded-xl font-semibold"
//                     >
//                         Register
//                     </button>

//                 </form>

//                 <button
//                     onClick={() =>
//                         navigate("/login")
//                     }
//                     className="w-full mt-4 border-2 border-black py-4 rounded-xl font-semibold"
//                 >
//                     Back To Login
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default RegisterPage;


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
            const response = await api.get("tenants/companies-dropdown/");
            setCompanies(response.data);
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await api.post("accounts/register/", {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                tenant: formData.tenant,
            });
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.error || "Registration Failed");
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center bg-black px-5 overflow-hidden font-sans">
            
            {/* Ambient RGB Glowing Orbs in the background */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(255,0,0)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgb(0,0,255)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(0,255,0)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Main Form Card with RGB Hover Shadow */}
            <div className="relative z-10 bg-black w-full max-w-lg rounded-[2rem] border border-zinc-800 p-8 md:p-10 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,0,0,0.3),0_0_40px_rgba(0,255,0,0.3),0_0_50px_rgba(0,0,255,0.3)] transition-shadow duration-700">
                
                <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Create Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Username Input with RGB Focus Ring */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <input
                            type="text" name="username" placeholder="Username"
                            onChange={handleChange} required
                            className="w-full bg-black text-white placeholder-zinc-500 px-5 py-4 rounded-xl outline-none"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <input
                            type="email" name="email" placeholder="Email"
                            onChange={handleChange} required
                            className="w-full bg-black text-white placeholder-zinc-500 px-5 py-4 rounded-xl outline-none"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <input
                            type="text" name="phone" placeholder="Phone Number"
                            onChange={handleChange} required
                            className="w-full bg-black text-white placeholder-zinc-500 px-5 py-4 rounded-xl outline-none"
                        />
                    </div>

                    {/* Tenant/Company Select */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <select
                            name="tenant" value={formData.tenant}
                            onChange={handleChange} required
                            className="w-full bg-black text-white px-5 py-4 rounded-xl outline-none appearance-none cursor-pointer"
                        >
                            <option value="" className="text-zinc-500">Select Company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id} className="bg-zinc-900 text-white">
                                    {company.company_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Password Input */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <input
                            type="password" name="password" placeholder="Password"
                            onChange={handleChange} required
                            className="w-full bg-black text-white placeholder-zinc-500 px-5 py-4 rounded-xl outline-none"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative p-[1px] rounded-xl bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
                        <input
                            type="password" name="confirmPassword" placeholder="Confirm Password"
                            onChange={handleChange} required
                            className="w-full bg-black text-white placeholder-zinc-500 px-5 py-4 rounded-xl outline-none"
                        />
                    </div>

                    {/* RGB Register Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="relative w-full group rounded-xl p-[2px] bg-white hover:bg-gradient-to-r hover:from-[rgb(255,0,0)] hover:via-[rgb(0,255,0)] hover:to-[rgb(0,0,255)] transition-all duration-300 active:scale-[0.98]"
                        >
                            <div className="w-full bg-white text-black group-hover:bg-black group-hover:text-white py-4 rounded-xl font-bold text-lg transition-all duration-300">
                                Register
                            </div>
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-transparent border border-zinc-700 text-white py-4 rounded-xl font-bold hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-[0.98]"
                    >
                        Back To Login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;