import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { getFriendRequests } from '../../apiCallls/friendRequestRoute';
import toast from 'react-hot-toast';

function SendFriendRequest() {
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        fetchAllRequests();
    }, []);

    const fetchAllRequests = async () => {
        try {
            const response = await getFriendRequests();
            if (response) {
                setAllRequests(response.outgoingRequests);
                toast.success(response.message);
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    console.log(allRequests);

  return (
    <div className='container mx-auto px-4 py-6'>
      <h2 className='text-2xl font-bold mb-6'>Send Friend Requests</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {allRequests.map((request) => (
        <div className='flex flex-col gap-2 border border-gray-300 rounded-md p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center gap-3'>
                <img 
                    src={request?.receiver?.profilePicture} 
                    className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200' 
                    alt="Profile" 
                />
                <div className='flex flex-col flex-1 min-w-0'>
                    <p className='text-sm sm:text-base font-medium truncate'>{request?.receiver?.username}</p>
                    <span className='text-xs sm:text-sm text-gray-500 flex items-center gap-1 truncate'>
                        <CiLocationOn className='text-base sm:text-lg flex-shrink-0' /> 
                        <span className='truncate'>{request?.receiver?.location}</span>
                    </span>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 mt-2'>
                <p className='text-xs sm:text-sm font-medium bg-lime-200 border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Native: {request?.receiver?.nativeLanguage}</p>
                <p className='text-xs sm:text-sm font-medium border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Learning: {request?.receiver?.learningLanguage}</p>
            </div>
            <p className='text-xs sm:text-sm text-gray-500 mt-1'>id: {request?._id}</p>
            <button disabled className='w-full btn btn-primary border border-gray-300 rounded-3xl mt-3 text-sm sm:text-base py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white'>
                <FaUserFriends className='text-base sm:text-lg' />
                <span>Send Friend Request</span>
            </button>
        </div>
        ))}
      </div>
    </div>
  )
}

export default SendFriendRequest
