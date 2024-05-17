import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

import DashboardLayout from "@/layouts/DashboardLayout";
import Login from "@/pages/auth/Login";
import Terms from "@/pages/auth/Terms";
import ErrorPage from "@/pages/ErrorPage";
import Users from "@/pages/dashboard/users";
import NewUser from "@/pages/dashboard/users/newUser";
import UserProfile from "@/pages/dashboard/users/userProfile";
import UpdateUser from "@/pages/dashboard/users/updateUser";
import Customers from "@/pages/dashboard/customers";
import NewCustomer from "@/pages/dashboard/customers/newCustomer";
import CustomerProfile from "@/pages/dashboard/customers/customerProfile";
import UpdateCustomer from "@/pages/dashboard/customers/updateCustomer";
import Ships from "@/pages/dashboard/ships";
import NewShip from "@/pages/dashboard/ships/newShip";
import ShipProfile from "@/pages/dashboard/ships/shipProfile";
import UpdateShip from "@/pages/dashboard/ships/updateShip";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/users" replace />} />

            {isAuthenticated && (
                <>
                    <Route path="/terms" element={<Terms />} />
                    <Route element={<DashboardLayout />}>
                        {/* User routes */}
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/register" element={<NewUser />} />
                        <Route path="/users/:id" element={<UserProfile />} />
                        <Route path="/users/:id/update" element={<UpdateUser />} />
                        {/* Customer routes */}
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/customers/register" element={<NewCustomer />} />
                        <Route path="/customers/:id" element={<CustomerProfile />} />
                        <Route path="/customers/:id/update" element={<UpdateCustomer />} />
                        {/* Ship routes */}
                        <Route path="/ships" element={<Ships />} />
                        <Route path="/ships/register" element={<NewShip />} />
                        <Route path="/ships/:id" element={<ShipProfile />} />
                        <Route path="/ships/:id/update" element={<UpdateShip />} />
                        {/* Error page */}
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;
