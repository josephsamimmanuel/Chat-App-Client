import React, { useState } from 'react'
import { registerUser, loginUser } from '../../apiCallls/userRoute';
import { uploadImage } from '../../apiCallls/uploadRoute';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { validateField } from '../../utils/constants';
import Loading from '../../components/loading';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [button, setButton] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
    });
    const [fileSelected, setFileSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setFileSelected(e.target.files[0]);
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
            setErrors({
                ...errors,
                [e.target.name]: validateField(e.target.name, e.target.value)
            });
        }
    };

    // Validation functions
    const validateLoginFields = (email, password) => {
        const errors = {};
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);
        
        if (emailError) errors.email = emailError;
        if (passwordError) errors.password = passwordError;
        
        return errors;
    };

    const validateRegistrationFields = (userData) => {
        const errors = {};
        Object.keys(userData).forEach((key) => {
            if (key !== 'profilePicture') {
                const error = validateField(key, userData[key]);
                if (error) errors[key] = error;
            }
        });
        return errors;
    };

    const handleSubmit = async () => {
        // Validate fields based on mode (login/register)
        const newErrors = button 
            ? validateRegistrationFields(userData)
            : validateLoginFields(userData.email, userData.password);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        if (button) {
            try {
                toast.loading("Registering...");
                const response = await registerUser(userData);
                if (response) {
                    toast.success(response.message);
                    toast.dismiss();
                    setUserData({
                        username: "",
                        email: "",
                        password: "",
                        profilePicture: "",
                    });
                    setFileSelected(null);
                }
                else {
                    toast.dismiss();
                    toast.error(response.message);
                }
            } catch (error) {
                toast.dismiss();
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                toast.loading("Logging in...");
                const response = await loginUser(userData);
                if (response) {
                    sessionStorage.setItem("token", response.token);
                    dispatch(setUser(response));
                    toast.dismiss();
                    toast.success(response.message);
                    setUserData({
                        username: "",
                        email: "",
                        password: "",
                        profilePicture: "",
                    });
                    console.log(response.data._id);
                    navigate(`/onboarding/${response.data._id}`);
                }
                else {
                    toast.dismiss();
                    toast.error(response.message);
                }
            } catch (error) {
                toast.dismiss();
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        if (!fileSelected) {
            toast.error("Please select an image to upload");
            return;
        }
        
        try {
            toast.loading("Uploading image...");
            const response = await uploadImage(fileSelected);
            if (response) {
                setUserData({
                    ...userData,
                    profilePicture: response.url
                });
                
                toast.dismiss();
                toast.success(response.message);
                setFileSelected(null);
            } else {
                toast.dismiss();
                toast.error(response.message);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.data?.message || "Failed to upload image");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-md sm:p-6 md:p-8 lg:max-w-lg">
                <h1 className="mb-4 text-center text-2xl font-bold text-indigo-600 sm:mb-6 sm:text-3xl md:text-4xl">
                    {button ? "Register" : "Login"}
                </h1>
                {/* Upload Image */}
                {button && (
                    <div className="mb-4 sm:mb-6">
                        <label className="block text-sm font-medium text-gray-700 md:text-base">Upload Image</label>
                        <div className="mt-2 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    name="profilePicture" 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base" 
                                />
                                <button 
                                    onClick={handleUploadImage} 
                                    className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:py-2 md:text-base"
                                >
                                    Upload Image
                                </button>
                            </div>
                            {userData.profilePicture && (
                                <div className="flex-shrink-0">
                                    <img 
                                        src={userData.profilePicture} 
                                        alt="Profile" 
                                        className="h-16 w-16 rounded-full border-2 border-indigo-500 object-cover sm:h-20 sm:w-20" 
                                    />
                                </div>
                            )}
                        </div>
                        {userData.profilePicture && (
                            <p className="mt-2 text-sm text-green-600 md:text-base">✓ Image uploaded successfully</p>
                        )}
                    </div>
                )}
                {/* Login Form */}
                {button ? (
                    <form className="space-y-3 sm:space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">User Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base"
                                placeholder="Your name"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base"
                                placeholder="Your email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base"
                                placeholder="Your password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                    </form>
                ) : (
                    <form className="space-y-3 sm:space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base"
                                placeholder="Your email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:px-3 sm:py-2 md:text-base"
                                placeholder="Your password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                    </form>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-6 sm:py-2 md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loading />
                            {button ? "Registering..." : "Logging in..."}
                        </div>
                    ) : (
                        button ? "Register" : "Login"
                    )}
                </button>
                <div className="mt-4 text-center sm:mt-6">
                    <p className="text-sm text-gray-500 md:text-base">
                        {button ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button 
                            onClick={() => setButton(!button)}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            {button ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;