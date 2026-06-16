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
    <div className="relative min-h-screen bg-black font-sans text-white overflow-hidden">
      
      {/* Background Animated Subtle Grid/Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 animate-pulse"></div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <h1 className="text-3xl font-extrabold tracking-widest text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          SAJAD
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="relative group bg-white text-black px-8 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Login</span>
          <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        </button>
      </nav>

      {/* BODY SECTION */}
      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-16 items-center mt-10">
          
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-gray-300 font-medium text-xs tracking-widest uppercase shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              Next-Gen SaaS
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              Build Your <br /> Business Through <br /> Our Platform
            </h1>

            <div className="space-y-6 text-lg text-gray-400 leading-relaxed border-l-2 border-zinc-800 pl-6">
              <p className="hover:text-gray-200 transition-colors duration-300">
                Our platform helps businesses create and manage their own digital stores, 
                service platforms, AI-powered systems, and customer interactions through 
                one centralized SaaS ecosystem.
              </p>
              <p className="hover:text-gray-200 transition-colors duration-300">
                Whether you own a mobile store, cake business, perfume company, rental service, 
                or customized product platform, you can collaborate with us and manage everything easily.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (Floating Card) */}
          <div className="relative group mt-10 lg:mt-0 animate-[bounce_8s_ease-in-out_infinite]">
            {/* Dark Glowing Shadow */}
            <div className="absolute -inset-1 bg-white opacity-5 rounded-[2.5rem] blur-xl group-hover:opacity-10 transition duration-700"></div>
            
            <div className="relative flex flex-col justify-center items-center bg-zinc-950 p-12 md:p-16 rounded-[2rem] border border-white/10 shadow-2xl h-full text-center hover:border-white/30 transition-colors duration-500">
              
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-4xl">🏢</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                Ready To <br /> Collaborate?
              </h2>
              
              <p className="text-zinc-500 mb-10 text-lg">
                Join our dark-mode ecosystem.
              </p>

              <button
                onClick={() => navigate("/company-register")}
                className="w-full bg-white text-black px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:-translate-y-2 transition-all duration-300"
              >
                Join Now
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default HomePage;