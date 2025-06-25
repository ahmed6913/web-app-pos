import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardPage from "@/routes/dashboard/page";
import BillingPage from "@/routes/billing/page";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

// Customers
import CustomersPage from "@/routes/customers/page";
import NewCustomerPage from "@/routes/newcustomers/page";

// Products (based on your structure)
import ProductsPage from "@/routes/products/page";
import NewProductPage from "@/routes/products/new";
import InventoryPage from "@/routes/products/inventory"; // optional

function App() {
    const router = createBrowserRouter([
        // Public
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },

        // Protected
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                { index: true, element: <DashboardPage /> },
                { path: "analytics", element: <h1 className="title">Analytics</h1> },
                { path: "reports", element: <h1 className="title">Reports</h1> },

                // Customers
                { path: "customers", element: <CustomersPage /> },
                { path: "new-customer", element: <NewCustomerPage /> },
                { path: "verified-customers", element: <h1 className="title">Verified Customers</h1> },

                // Products (fixed!)
                { path: "products", element: <ProductsPage /> },
                { path: "new-product", element: <NewProductPage /> },
                { path: "inventory", element: <InventoryPage /> },

                // Billing & Settings
                { path: "billing", element: <BillingPage /> },
                { path: "settings", element: <h1 className="title">Settings</h1> },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
