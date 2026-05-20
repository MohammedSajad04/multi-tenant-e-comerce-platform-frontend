import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-10 py-6 bg-black text-white">

        <h1 className="text-3xl font-bold">
          SAJAD
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Login
        </button>

      </div>


      {/* BODY SECTION */}

      <div className="grid md:grid-cols-2 gap-10 items-center px-10 py-24">

        {/* LEFT SIDE */}

        <div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">

            Build Your Business
            <br />
            Through Our
            <br />
            SaaS Platform

          </h1>

          <p className="text-lg text-gray-700 leading-8 mb-6">

            Our platform helps businesses create and manage
            their own digital stores, service platforms,
            AI-powered systems, and customer interactions
            through one centralized SaaS ecosystem.

          </p>

          <p className="text-lg text-gray-700 leading-8 mb-6">

            Whether you own a mobile store, cake business,
            perfume company, rental service, or customized
            product platform, you can collaborate with us
            and manage everything easily.

          </p>

          <p className="text-lg text-gray-700 leading-8">

            Affordable monthly pricing, scalable dashboards,
            AI integrations, product management, customer
            support, and analytics all in one place.

          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="flex flex-col justify-center items-center bg-white p-12 rounded-3xl shadow-lg">

          <p className="text-2xl font-semibold mb-6 text-center">

            If You Want To
            <br />
            Collaborate With Us

          </p>

          <button
            onClick={() => navigate("/company-register")}
            className="bg-black text-white px-10 py-4 rounded-xl text-xl hover:bg-gray-800 transition"
          >
            Join
          </button>

        </div>

      </div>

    </div>
  )
}

export default HomePage;
