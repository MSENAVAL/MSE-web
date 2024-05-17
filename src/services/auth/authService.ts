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

        if (terms)
            await api.post("/auth/aceitar-termos-de-uso", {
                email,
                aceitouTermosDeUso: terms,
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

export const forgotPasssword = async (email: string): Promise<any> => {
    try {
        const response = await api.post("/auth/esqueceu-senha", { email });

        if (response && response.status === 200) {
            return {
                status: "success",
                token: response.data.token,
                expiresIn: response.data.expiresIn,
                user: response.data.userId,
            };
        }

        return;
    } catch (error: Error | any) {
        console.log("error", error);
        return {
            status: "error",
            message: error.response.data,
        };
    }
};

export const resetPassword = async (
    userId: string,
    token: string,
    password: string,
    expiresIn: string,
): Promise<any> => {
    try {
        const response = await api.post("/auth/redefinir-senha", {
            userId,
            token,
            novaSenha: password,
            confirmarSenha: password,
        });

        if (response && response.status === 200) {
            localStorage.setItem("mseAuthToken", token);
            localStorage.setItem("mseTokenExpiresIn", expiresIn);
        }

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return {
            status: "error",
            message: error.response.data,
        };
    }
};
