import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="flex justify-between items-center px-10 py-5 bg-black text-white">

      <h1 className="text-2xl font-bold">
        SaaS Platform
      </h1>

      <div className="flex gap-5">

        <Link to="/">
          Home
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </div>
  )
}

export default Navbar;
