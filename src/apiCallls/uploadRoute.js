import axiosInstance from "./index";

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const response = await axiosInstance.post("/upload/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

