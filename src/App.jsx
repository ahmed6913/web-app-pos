import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains"; // You can change this later

import Layout from "@/routes/layout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardPage from "@/routes/dashboard/page";
import BillingPage from "@/routes/billing/page";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

// Customers
import CustomersPage from "@/routes/customers/page";
import NewCustomerPage from "@/routes/newcustomers/page";

// Products
import ProductsPage from "@/routes/products/page";
import NewProductPage from "@/routes/products/new";
import InventoryPage from "@/routes/products/inventory";

import SettingsPage from "@/routes/settings/page";
import AnalyticsPage from "@/routes/analytics/page";

function App() {
  const router = createBrowserRouter([
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "analytics", element: <AnalyticsPage /> },
        { path: "reports", element: <h1 className="title">Reports</h1> },

        // Customers
        { path: "customers", element: <CustomersPage /> },
        { path: "new-customer", element: <NewCustomerPage /> },
        { path: "verified-customers", element: <h1 className="title">Verified Customers</h1> },

        // Products
        { path: "products", element: <ProductsPage /> },
        { path: "new-product", element: <NewProductPage /> },
        { path: "inventory", element: <InventoryPage /> },

        // Billing & Settings
        { path: "billing", element: <BillingPage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
  ]);

  return (
    <ThirdwebProvider activeChain={Mumbai}>
      <ThemeProvider storageKey="theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default App;
