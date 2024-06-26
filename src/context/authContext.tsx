import { createContext, useContext, useEffect, useState } from "react";
import { authenticate, checkIsAuthenticated } from "@/services/auth/authService";
import { LoginResponseData, LoginResponseError } from "@/interfaces/authTypes";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    isAuthenticated: false,
    userData: {} as LoginResponseData | null,
    setUserData: (data: LoginResponseData) => {},
    login: async (email: string, password: string, terms?: boolean) => {
        return {} as LoginResponseData | LoginResponseError;
    },
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({} as LoginResponseData);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("mseAuthToken") && checkIsAuthenticated());
    }, []);

    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const login = async (email: string, password: string, terms?: boolean) => {
        if (terms === true) {
            const response = await authenticate(email, password, terms);
            if (response.token) {
                localStorage.setItem("mseAuthToken", response.token);
                localStorage.setItem("mseTokenExpiresIn", response.expiresIn);
                setIsAuthenticated(true);
                setUserData(response);
            }

            return response;
        }

        const response = await authenticate(email, password);

        if (response.token) {
            localStorage.setItem("mseAuthToken", response.token);
            localStorage.setItem("mseTokenExpiresIn", response.expiresIn);
            setIsAuthenticated(true);
            setUserData(response);
        }

        return response;
    };

    const logout = () => {
        localStorage.removeItem("mseAuthToken");
        localStorage.removeItem("mseTokenExpiresIn");
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
