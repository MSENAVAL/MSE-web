import { LoginResponseData } from "@/interfaces/authTypes";
import api from "../api";

export const authenticate = async (email: string, password: string): Promise<LoginResponseData> => {
    try {
        const response = await api.post("/auth/login", {
            email,
            senha: password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const isAuthenticated = (): boolean => {
    const authToken = localStorage.getItem("mseAuthToken");
    return !!authToken;
};
