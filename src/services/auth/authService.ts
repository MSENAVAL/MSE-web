import { LoginResponseData, LoginResponseError } from "@/interfaces/authTypes";
import api from "../api";

export const authenticate = async (
    email: string,
    password: string,
    terms?: boolean,
): Promise<LoginResponseData | LoginResponseError> => {
    try {
        const response = await api.post("/auth/login", {
            email,
            senha: password,
            aceitouTermosDeUso: terms || undefined,
        });

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return error.message;
    }
};

export const checkIsAuthenticated = (): boolean => {
    const authToken = localStorage.getItem("mseAuthToken");

    const currentDate = new Date();
    const tokenExpiresIn = localStorage.getItem("mseTokenExpiresIn");

    const expirationDate = new Date(tokenExpiresIn || currentDate);

    if (currentDate > expirationDate) {
        localStorage.removeItem("mseAuthToken");
        localStorage.removeItem("mseTokenExpiresIn");
        return false;
    }

    return !!authToken;
};
