import {
  Routes,
  Route
} from 'react-router-dom'

import HomePage from './pages/public/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CompanyPage from './pages/company/CompanyPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import SuperAdminPage from './pages/superadmin/SuperAdminPage'
import CompanyRegisterPage from "./pages/auth/CompanyRegisterPage";


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
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/company/:slug"
        element={<CompanyPage />}
      />

      <Route
        path="/dashboard/:slug"
        element={<DashboardPage />}
      />

      <Route
        path="/super-admin"
        element={<SuperAdminPage />}
      />
      <Route
          path="/company-register"
          element={<CompanyRegisterPage />}
      />
    </Routes>
  )
}

export default App
