import axiosInstance from "./index";

export const registerUser = async (userData) => {
    console.log(userData);
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
};

export const logoutUser = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/auth/current");
    return response.data;
};
