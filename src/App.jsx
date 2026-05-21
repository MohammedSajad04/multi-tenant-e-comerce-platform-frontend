import {

  Routes,
  Route

} from "react-router-dom";


import HomePage from "./pages/public/HomePage";

import LoginPage from "./pages/auth/LoginPage";

import CompanyRegisterPage from "./pages/auth/CompanyRegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";



function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />


      <Route
        path="/login"
        element={<LoginPage />}
      />


      <Route
        path="/company-register"
        element={<CompanyRegisterPage />}
      />


      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <DashboardPage />

          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App;
