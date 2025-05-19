import axiosInstance from "./index";

export const sendFriendRequest = async (receiverId) => {
    const response = await axiosInstance.post(`/friend-request/send/${receiverId}`);
    return response.data;
};

export const getFriendRequests = async () => {
    const response = await axiosInstance.get(`/friend-request/get-all-friend-requests`);
    return response.data;
};

export const acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.post(`/friend-request/accept/${requestId}`);
    return response.data;
};

export const declineFriendRequest = async (requestId) => {
    const response = await axiosInstance.post(`/friend-request/decline/${requestId}`);
    return response.data;
};

export const deleteFriendRequest = async (requestId) => {
    const response = await axiosInstance.delete(`/friend-request/delete/${requestId}`);
    return response.data;
};



