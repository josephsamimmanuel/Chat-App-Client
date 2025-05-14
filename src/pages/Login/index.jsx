import React, { useState } from 'react'
import { registerUser, loginUser } from '../../apiCallls/userRoute';
import { uploadImage } from '../../apiCallls/uploadRoute';
import { toast } from 'react-hot-toast';

function Login() {
    const [button, setButton] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
    });
    const [fileSelected, setFileSelected] = useState(null);
    
    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setFileSelected(e.target.files[0]);
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async () => {
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
            }
        } else {
            try {
                toast.loading("Logging in...");
                const response = await loginUser(userData);
                if (response) {
                    localStorage.setItem("token", response.token);
                    toast.dismiss();
                    toast.success(response.message);
                    setUserData({
                        username: "",
                        email: "",
                        password: "",
                        profilePicture: "",
                    });
                }
                else {
                    toast.dismiss();
                    toast.error(response.message);
                }
            } catch (error) {
                toast.dismiss();
                toast.error(error.response.data.message);
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-4xl font-bold text-indigo-600">{button ? "Register" : "Login"}</h1>
                {/* Upload Image */}
                {button && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    name="profilePicture" 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500" 
                                />
                                <button 
                                    onClick={handleUploadImage} 
                                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Upload Image
                                </button>
                            </div>
                            {userData.profilePicture && (
                                <div className="flex-shrink-0">
                                    <img 
                                        src={userData.profilePicture} 
                                        alt="Profile" 
                                        className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500" 
                                    />
                                </div>
                            )}
                        </div>
                        {userData.profilePicture && (
                            <p className="mt-2 text-sm text-green-600">✓ Image uploaded successfully</p>
                        )}
                    </div>
                )}
                {/* Login Form */}
                {button ? (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">User Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Your name"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Your email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Your password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                ) : (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Your email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Your password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                )}
                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                    onClick={handleSubmit}
                >
                    {button ? "Register" : "Login"}
                </button>
                <div className="mt-4 text-center">
                    <p className="text-gray-500">{button ? "Already have an account?" : "Don't have an account?"} <button onClick={() => setButton(!button)}>{button ? "Login" : "Register"}</button></p>
                </div>
            </div>
        </div>
    )
}

export default Login;