import axiosInstance from "./index";

export const getStreamTokenChat = async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
};

