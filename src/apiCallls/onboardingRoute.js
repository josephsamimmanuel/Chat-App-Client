import axiosInstance from "./index";

export const onboardingRoute = async (data) => {
    const response = await axiosInstance.post('/onboarding/onboarding', data);
    return response.data;
};

