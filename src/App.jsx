import {Routes, Route} from "react-router-dom";


import HomePage from "./pages/public/HomePage";

import LoginPage from "./pages/auth/LoginPage";

import CompanyRegisterPage from "./pages/auth/CompanyRegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ProductsPage from "./pages/dashboard/ProductsPage";

import CompaniesPage from "./pages/public/CompaniesPage";

import CompanyDetailsPage from "./pages/public/CompanyDetailsPage";

import PendingCompaniesPage from "./pages/superadmin/PendingCompaniesPage";

import TenantsPage from "./pages/superadmin/TenantsPage";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

import ProductDetailsPage from "./pages/public/ProductDetailsPage";

import UserOrdersPage from "./pages/public/UserOrdersPage";

import AdminRoute from "./routes/AdminRoute";

import CustomerRoute from "./routes/CustomerRoute";

import SuperAdminRoute from "./routes/SuperAdminRoute";

import ShopPage from "./pages/public/ShopPage";

import CartPage from "./pages/public/CartPage";

import CheckoutPage from "./pages/public/CheckoutPage";

import OrderSuccessPage from "./pages/public/OrderSuccessPage";

import ManageCompaniesPage from "./pages/superadmin/ManageCompaniesPage";

import ManageUsersPage from "./pages/superadmin/ManageUsersPage";

import CustomersDashboard from "./pages/dashboard/CustomersDashboard";

import OrdersDashboard from "./pages/dashboard/OrdersDashboard";

import SubscriptionPage from "./pages/dashboard/SubscriptionPage";

function App() {

  return (

    <Routes>

      {/* PUBLIC ROUTES */}

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
        path="/companies"
        element={<CompaniesPage />}
      />


      <Route
        path="/company/:id"
        element={<CompanyDetailsPage />}
      />


      <Route
        path="/product/:id"
        element={<ProductDetailsPage />}
      />

      <Route
        path="/shop"
        element={
          <CustomerRoute>
            <ShopPage />
          </CustomerRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <CustomerRoute>

            <CartPage />

          </CustomerRoute>
        }
        
      />
      <Route
        path="/checkout"
        element={
          <CustomerRoute>

            <CheckoutPage />

          </CustomerRoute>
        }
      />
        <Route
          path="/order-success"
          element={
            <CustomerRoute>

              <OrderSuccessPage />

            </CustomerRoute>
          }
        />

        <Route
            path="/customers"
            element={
                <AdminRoute>
                    <CustomersDashboard />
                </AdminRoute>
            }
        />


      {/* COMPANY ADMIN ROUTES */}

      <Route
        path="/dashboard"
        element={
          <AdminRoute>

            <DashboardPage />

          </AdminRoute>
        }
      />


      <Route
        path="/products"
        element={
          <AdminRoute>

            <ProductsPage />

          </AdminRoute>
        }
      />
        <Route
          path="/orders"
          element={
              <AdminRoute>
                  <OrdersDashboard />
              </AdminRoute>
          }
      />
      <Route
          path="/subscription"
          element={
              <AdminRoute>
                  <SubscriptionPage />
              </AdminRoute>
          }
      />


      {/* CUSTOMER ROUTES */}

      <Route
        path="/my-orders"
        element={
          <CustomerRoute>

            <UserOrdersPage />

          </CustomerRoute>
        }
      />



      {/* SUPER ADMIN ROUTES */}
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>

            <SuperAdminDashboard />

          </SuperAdminRoute>
       }
      />
      <Route
        path="/pending-companies"
        element={
          <SuperAdminRoute>

            <PendingCompaniesPage />

          </SuperAdminRoute>
        }
      />
      <Route
        path="/tenants"
        element={
          <SuperAdminRoute>

            <TenantsPage />

          </SuperAdminRoute>
        }
      />
      <Route
        path="/manage-companies"
        element={
          <SuperAdminRoute>

            <ManageCompaniesPage />

          </SuperAdminRoute>
        }
      />
      <Route
          path="/manage-users"
          element={
              <SuperAdminRoute>
                  <ManageUsersPage />
              </SuperAdminRoute>
          }
      />

    </Routes>
  )
}

export default App;
