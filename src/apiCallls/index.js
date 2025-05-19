import axios from "axios";

const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:7777/api" : "https://chat-app-service-4q1t.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
