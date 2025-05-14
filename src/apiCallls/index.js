import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:7777/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
