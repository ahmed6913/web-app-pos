import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardPage from "@/routes/dashboard/page";
import BillingPage from "@/routes/billing/page";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

// ✅ Correct imports based on your structure
import CustomersPage from "@/routes/customers/page";
import NewCustomerPage from "@/routes/newcustomers/page";

function App() {
    const router = createBrowserRouter([
        // Public routes
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/login",
            element: <Login />,
        },

        // Protected routes
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

                // ✅ Correct routing for customers
                { path: "customers", element: <CustomersPage /> },
                { path: "new-customer", element: <NewCustomerPage /> },
                { path: "verified-customers", element: <h1 className="title">Verified Customers</h1> },

                { path: "products", element: <h1 className="title">Products</h1> },
                { path: "new-product", element: <h1 className="title">New Product</h1> },
                { path: "inventory", element: <h1 className="title">Inventory</h1> },
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
