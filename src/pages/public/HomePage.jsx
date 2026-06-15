// import { useNavigate } from "react-router-dom";

// function HomePage() {

//   const navigate = useNavigate();

//   return (

//     <div className="min-h-screen bg-gray-100">

//       {/* NAVBAR */}

//       <div className="flex justify-between items-center px-10 py-6 bg-black text-white">

//         <h1 className="text-3xl font-bold">
//           SAJAD
//         </h1>

//         <button
//           onClick={() => navigate("/login")}
//           className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
//         >
//           Login
//         </button>

//       </div>


//       {/* BODY SECTION */}

//       <div className="grid md:grid-cols-2 gap-10 items-center px-10 py-24">

//         {/* LEFT SIDE */}

//         <div>

//           <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">

//             Build Your Business
//             <br />
//             Through Our
//             <br />
//             SaaS Platform

//           </h1>

//           <p className="text-lg text-gray-700 leading-8 mb-6">

//             Our platform helps businesses create and manage
//             their own digital stores, service platforms,
//             AI-powered systems, and customer interactions
//             through one centralized SaaS ecosystem.

//           </p>

//           <p className="text-lg text-gray-700 leading-8 mb-6">

//             Whether you own a mobile store, cake business,
//             perfume company, rental service, or customized
//             product platform, you can collaborate with us
//             and manage everything easily.

//           </p>

//           <p className="text-lg text-gray-700 leading-8">

//             Affordable monthly pricing, scalable dashboards,
//             AI integrations, product management, customer
//             support, and analytics all in one place.

//           </p>

//         </div>


//         {/* RIGHT SIDE */}

//         <div className="flex flex-col justify-center items-center bg-white p-12 rounded-3xl shadow-lg">

//           <p className="text-2xl font-semibold mb-6 text-center">

//             If You Want To
//             <br />
//             Collaborate With Us

//           </p>

//           <button
//             onClick={() => navigate("/company-register")}
//             className="bg-black text-white px-10 py-4 rounded-xl text-xl hover:bg-gray-800 transition"
//           >
//             Join
//           </button>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default HomePage;


import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans text-gray-900 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 hover:scale-105 transition-transform duration-300 cursor-pointer">
          SAJAD
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Login
        </button>
      </nav>

      {/* BODY SECTION */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm shadow-sm">
              🚀 Elevate your business today
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Build Your Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Through Our SaaS Platform
              </span>
            </h1>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Our platform helps businesses create and manage their own digital stores, 
                service platforms, AI-powered systems, and customer interactions through 
                one centralized SaaS ecosystem.
              </p>

              <p>
                Whether you own a mobile store, cake business, perfume company, rental service, 
                or customized product platform, you can collaborate with us and manage everything easily.
              </p>

              <div className="bg-white/60 p-5 rounded-2xl border border-gray-100 shadow-sm">
                <p className="font-medium text-gray-800 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1">✅ Affordable Pricing</span>
                  <span className="flex items-center gap-1">✅ Scalable Dashboards</span>
                  <span className="flex items-center gap-1">✅ AI Integrations</span>
                  <span className="flex items-center gap-1">✅ Advanced Analytics</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative group mt-10 lg:mt-0">
            {/* Glowing Background Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative flex flex-col justify-center items-center bg-white p-12 md:p-16 rounded-[2rem] shadow-2xl border border-gray-100 h-full text-center">
              
              {/* Optional Decorative Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-200 rounded-full flex items-center justify-center mb-8 shadow-inner border border-gray-100">
                <span className="text-3xl">🤝</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                Ready To <br /> Collaborate With Us?
              </h2>
              
              <p className="text-gray-500 mb-10 text-lg">
                Join our ecosystem and scale your operations with cutting-edge tools.
              </p>

              <button
                onClick={() => navigate("/company-register")}
                className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-xl text-xl font-semibold hover:bg-gray-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Join Now
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default HomePage;