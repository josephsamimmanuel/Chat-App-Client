import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { getUsers } from '../../apiCallls/getusers';
import { sendFriendRequest } from '../../apiCallls/friendRequestRoute';
import toast from 'react-hot-toast';

function NewLearner() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            if (users) {
                setUsers(users.users);
            }
            else {
                toast.error(users.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendFriendRequest = async (userId) => {
        try {
            const response = await sendFriendRequest(userId);
            if (response) {
                toast.success(response.message);
                setUsers(users.filter((user) => user._id !== userId));
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <div className='w-full'>
            {users.length === 0 ? (
                <div className='flex flex-col gap-2 p-4 w-full h-full justify-center items-center'>
                    <p className='text-sm sm:text-base font-medium'>No new learners found</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {users.map((user) => (
                <div className='flex flex-col gap-2 border border-gray-300 rounded-md p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200'>
                    <div className='flex items-center gap-2'>
                        <img 
                            src={user?.profilePicture} 
                            className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover' 
                            alt="Profile" 
                        />
                        <div className='flex flex-col'>
                            <p className='text-sm sm:text-base font-medium'>{user?.username}</p>
                            <span className='text-xs sm:text-sm text-gray-500 flex items-center gap-1'>
                                <CiLocationOn className='text-base sm:text-lg' /> 
                                {user?.location}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2'>
                        <p className='text-xs sm:text-sm font-medium bg-lime-200 border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Native: {user?.nativeLanguage}</p>
                        <p className='text-xs sm:text-sm font-medium border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Learning: {user?.learningLanguage}</p>
                    </div>
                    <p className='text-xs sm:text-sm text-gray-500'>id: {user?._id}</p>
                    <button onClick={() => handleSendFriendRequest(user?._id)} className='w-full btn btn-primary border border-gray-300 rounded-3xl mt-2 text-sm sm:text-base py-1.5 hover:bg-blue-700 transition-colors duration-200'>
                        <FaUserFriends className='mr-1' />
                        Send Friend Request
                    </button>
                </div>
                ))}
                </div>
            )}
        </div>
    )
}

export default NewLearner
