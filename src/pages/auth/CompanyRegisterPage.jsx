// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerCompany } from "../../services/companyService";

// function CompanyRegisterPage() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//     company_name: "",
//     owner_name: "",
//     company_email: "",
//     phone_number: "",
//     address: "",
//     business_type: "",
//     password: "",
//     confirm_password: "",
// });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (
//         formData.password !==
//         formData.confirm_password
//     ) {
//         alert(
//             "Passwords do not match"
//         );
//         return;
//     }

//     try {

//         await registerCompany(formData);

//         alert(
//             "Company Registration Submitted Successfully"
//         );

//         navigate("/");

//     } catch (error) {

//         console.log(error);

//         console.log(
//             error.response?.data
//         );

//         alert(
//             JSON.stringify(
//                 error.response?.data
//             )
//         );
//     }
// };

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-black to-gray-800 flex justify-center items-center py-20 px-5">

//             <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10">

//                 <h1 className="text-5xl font-bold text-center mb-3">

//                     Collaborate With Us

//                 </h1>

//                 <p className="text-center text-gray-600 mb-10 text-lg">

//                     Create your business platform through SAJAD SaaS

//                 </p>


//                 <form
//                     onSubmit={handleSubmit}
//                     className="grid md:grid-cols-2 gap-5"
//                 >


//                     <input
//                         type="text"
//                         name="company_name"
//                         placeholder="Company Name"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <input
//                         type="text"
//                         name="owner_name"
//                         placeholder="Owner Name"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <input
//                         type="email"
//                         name="company_email"
//                         placeholder="Company Email"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <input
//                         type="text"
//                         name="phone_number"
//                         placeholder="Phone Number"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <input
//                         type="text"
//                         name="address"
//                         placeholder="Company Address"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black md:col-span-2"
//                     />


//                     <select
//                         name="business_type"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black md:col-span-2"
//                     >

//                         <option value="">
//                             Select Business Type
//                         </option>

//                         <option value="ecommerce">
//                             Ecommerce
//                         </option>

//                         <option value="service">
//                             Service
//                         </option>

//                         <option value="hybrid">
//                             Hybrid
//                         </option>

//                     </select>


//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <input
//                         type="password"
//                         name="confirm_password"
//                         placeholder="Confirm Password"
//                         onChange={handleChange}
//                         className="border border-gray-300 p-4 rounded-xl outline-none focus:border-black"
//                     />


//                     <button
//                         className="bg-black text-white py-4 rounded-xl text-lg font-semibold md:col-span-2 hover:bg-gray-800 transition"
//                     >

//                         Submit Collaboration Request

//                     </button>

//                 </form>

//             </div>

//         </div>
//     )
// }

// export default CompanyRegisterPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCompany } from "../../services/companyService";

function CompanyRegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company_name: "", owner_name: "", company_email: "",
        phone_number: "", address: "", business_type: "",
        password: "", confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match"); return;
        }
        try {
            await registerCompany(formData);
            alert("Company Registration Submitted Successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert(JSON.stringify(error.response?.data));
        }
    };

    return (
        <div className="min-h-screen bg-black flex justify-center items-center py-20 px-5 relative overflow-hidden text-white font-sans">
            
            {/* Abstract Dark Background Animation */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-zinc-900 rounded-full blur-[120px] opacity-50 animate-[pulse_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neutral-800 rounded-full blur-[100px] opacity-30 animate-[pulse_8s_ease-in-out_infinite_reverse]"></div>

            <div className="relative z-10 bg-zinc-950/80 backdrop-blur-2xl w-full max-w-4xl rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-10 md:p-14 hover:border-white/20 transition-all duration-700">
                
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg">
                        Collaborate With Us
                    </h1>
                    <div className="h-1 w-16 bg-white mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    <p className="text-zinc-400 text-lg">
                        Create your business platform through SAJAD SaaS
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    {/* Input Fields */}
                    {[
                        { label: "Company Name", name: "company_name", type: "text" },
                        { label: "Owner Name", name: "owner_name", type: "text" },
                        { label: "Company Email", name: "company_email", type: "email" },
                        { label: "Phone Number", name: "phone_number", type: "text" }
                    ].map((input) => (
                        <div key={input.name} className="group">
                            <input
                                type={input.type} name={input.name} placeholder={input.label}
                                onChange={handleChange} required
                                className="w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-black focus:border-white focus:ring-1 focus:ring-white group-hover:border-zinc-600"
                            />
                        </div>
                    ))}

                    <div className="md:col-span-2 group">
                        <input
                            type="text" name="address" placeholder="Full Company Address"
                            onChange={handleChange} required
                            className="w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-black focus:border-white focus:ring-1 focus:ring-white group-hover:border-zinc-600"
                        />
                    </div>

                    <div className="md:col-span-2 group">
                        <select
                            name="business_type" onChange={handleChange} required
                            className="w-full bg-zinc-900 text-white border border-zinc-800 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-black focus:border-white focus:ring-1 focus:ring-white group-hover:border-zinc-600 appearance-none cursor-pointer"
                        >
                            <option value="" className="text-zinc-500">Select Business Type</option>
                            <option value="ecommerce">Ecommerce</option>
                            <option value="service">Service</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="group">
                        <input
                            type="password" name="password" placeholder="Password"
                            onChange={handleChange} required
                            className="w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-black focus:border-white focus:ring-1 focus:ring-white group-hover:border-zinc-600"
                        />
                    </div>

                    <div className="group">
                        <input
                            type="password" name="confirm_password" placeholder="Confirm Password"
                            onChange={handleChange} required
                            className="w-full bg-zinc-900 text-white placeholder-zinc-500 border border-zinc-800 p-4 rounded-xl outline-none transition-all duration-300 focus:bg-black focus:border-white focus:ring-1 focus:ring-white group-hover:border-zinc-600"
                        />
                    </div>

                    <button className="relative bg-white text-black py-4 rounded-xl text-lg font-bold md:col-span-2 transform transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-[0.98]">
                        Submit Collaboration Request
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CompanyRegisterPage;