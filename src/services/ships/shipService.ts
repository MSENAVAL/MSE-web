import { Ship } from "@/interfaces/ship";
import api from "../api";

export const createShip = async (data: Ship): Promise<any> => {
    try {
        const response = await api.post("/cadastro-navio", {
            ...data,
            id: 0,
            userId: "string",
        });

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        if (error.response.data) return { mensagem: error.response.data };
        return {
            mensagem: "Tivemos um problema ao tentar cadastrar o navio. Tente novamente mais tarde.",
        };
    }
};

export const listShips = async (): Promise<Ship[]> => {
    try {
        const response = await api.get("/cadastro-navio");

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

export const getShip = async (id: number): Promise<Ship> => {
    try {
        const response = await api.get(`/cadastro-navio/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return {} as Ship;
    }
};

export const updateShip = async (data: Ship): Promise<any> => {
    try {
        const response = await api.put(`/cadastro-navio/${data.id}`, data);
        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
        return { mensagem: error.response.data };
    }
};

export const deleteShip = async (id: number): Promise<void> => {
    try {
        const response = await api.delete(`/cadastro-navio/${id}`);

        return response.data;
    } catch (error: Error | any) {
        console.log("error", error);
    }
};
