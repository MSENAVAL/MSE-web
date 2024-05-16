import { Customer } from "@/interfaces/customer";
import api from "../api";
import { useAuth } from "@/context/authContext";

export const createCustomer = async (data: Customer): Promise<any> => {
    try {
        const response = await api.post("/cliente-cadastrado", {
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

export const listCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get("/cliente-cadastrado");

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

export const getCustomer = async (id: number): Promise<Customer> => {
    try {
        const response = await api.get(`/cliente-cadastrado/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return {} as Customer;
    }
};

export const updateCustomer = async (data: Customer): Promise<any> => {
    try {
        const response = await api.put(`/cliente-cadastrado/${data.id}`, data);
        console.log("response.data", response.data);
        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return { mensagem: error.response.data };
    }
};

export const deleteCustomer = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/cliente-cadastrado/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
    }
};
