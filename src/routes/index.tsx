import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

import Login from "@/pages/auth/Login";
import Terms from "@/pages/auth/Terms";
import ErrorPage from "@/pages/ErrorPage";
import Users from "@/pages/dashboard/Users";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/users" replace />} />

            {isAuthenticated && (
                <>
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<ErrorPage />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;
