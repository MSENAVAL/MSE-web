import { createContext, useContext, useEffect, useState } from "react";
import { authenticate } from "@/services/auth/authService";
import { LoginResponseData } from "@/interfaces/authTypes";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    isAuthenticated: false,
    userData: {} as LoginResponseData | null,
    setUserData: (data: LoginResponseData) => {},
    login: async (email: string, password: string) => {
        return {} as LoginResponseData;
    },
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({} as LoginResponseData);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("mseAuthToken"));
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authenticate(email, password);
        if (response.token) {
            localStorage.setItem("mseAuthToken", response.token);
            setIsAuthenticated(true);
            setUserData(response);
        }

        return response;
    };

    const logout = () => {
        localStorage.removeItem("mseAuthToken");
        setUserData({} as LoginResponseData);
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
