import axios from "axios";

const api = axios.create({
    baseURL: "http://191.252.113.178:5251/api",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("mseToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.defaults.headers.common["Content-Type"] = "multipart/form-data";
api.defaults.headers.common["Content-Type"] = "application/json";

export default api;
