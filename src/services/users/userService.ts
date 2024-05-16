import {
    User,
    UserForgotPasswordResponse,
    UserRegisterResponse,
    UserResetPasswordByToken,
    UserUpdatePassword,
} from "@/interfaces/user";
import api from "../api";

export const createUser = async (data: User): Promise<UserRegisterResponse> => {
    try {
        const response = await api.post("/cadastro-usuario", {
            ...data,
            id: 0,
            senha: "string",
            confirmarSenha: "string",
            userId: "string",
        });

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return { mensagem: error.response.data };
    }
};

export const listUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get("/cadastro-usuario");

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        if (error.response.status === 401) {
            localStorage.removeItem("mseAuthToken");
            localStorage.removeItem("mseTokenExpiresIn");
        }
        return [];
    }
};

export const getUser = async (id: number): Promise<User> => {
    try {
        const response = await api.get(`/cadastro-usuario/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return {} as User;
    }
};

export const updateUser = async (data: User): Promise<UserRegisterResponse> => {
    try {
        const response = await api.put(`/cadastro-usuario/${data.id}`, data);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return { mensagem: error.response.data };
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/cadastro-usuario/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
    }
};

export const forgotPassword = async (email: string): Promise<UserForgotPasswordResponse> => {
    try {
        const response = await api.post("/esqueceu-senha", { email });

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return { message: error.response.data };
    }
};

export const updatePassword = async (data: UserUpdatePassword): Promise<string> => {
    try {
        const response = await api.put("/alterar-senha", data);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return "Erro ao alterar a senha.";
    }
};

export const resetPasswordByToken = async (data: UserResetPasswordByToken): Promise<string> => {
    try {
        const response = await api.post("/redefinir-senha", data);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return "Erro ao redefinir a senha.";
    }
};
