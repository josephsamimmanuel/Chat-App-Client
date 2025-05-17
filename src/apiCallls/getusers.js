import axiosInstance from "./index";

export const getUsers = async () => {
    const response = await axiosInstance.get("/user/recommended");
    return response.data;
};

