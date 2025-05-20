import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { getFriendRequests, deleteFriendRequest } from '../../apiCallls/friendRequestRoute';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../redux/loader';
import { ComponentLoader } from '../../components/Loader';
function SendFriendRequest() {
    const [allRequests, setAllRequests] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state?.loader?.isLoading);

    useEffect(() => {
        fetchAllRequests();
    }, []);

    const fetchAllRequests = async () => {
        dispatch(setIsLoading(true));
        try {
            const response = await getFriendRequests();
            if (response) {
                setAllRequests(response.outgoingRequests);
                toast.success(response.message);
                dispatch(setIsLoading(false));
            }
            else {
                toast.error(response.message);
                dispatch(setIsLoading(false));
            }
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(setIsLoading(false));
        }
    };

    const handleDeleteRequest = async (requestId) => {
        try {
            const response = await deleteFriendRequest(requestId);
            if (response) {
                toast.success(response.message);
                setAllRequests(allRequests.filter((request) => request._id !== requestId));
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

  return (
    <div className='container mx-auto px-4 py-6'>
      <h2 className='text-2xl font-bold mb-6'>Send Friend Requests</h2>
      {allRequests.length === 0 ? (
        <div className='flex flex-col gap-2 p-4 w-full h-full justify-center items-center'>
          <p className='text-sm sm:text-base font-medium'>No pending friend requests</p>
          {isLoading && <ComponentLoader />}
        </div>
      ) : (
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
            <div className='flex flex-col sm:flex-row gap-2 w-full mt-3'>
                <button 
                    disabled 
                    className='w-full sm:w-1/2 btn btn-primary border border-gray-300 rounded-3xl text-sm sm:text-base py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white'
                >
                    <span>Sent</span>
                </button>
                <button 
                    onClick={() => handleDeleteRequest(request?._id)} 
                    className='w-full sm:w-1/2 btn btn-primary border border-gray-300 rounded-3xl text-sm sm:text-base py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white'
                >
                    <span>Delete</span>
                </button>
            </div>
        </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default SendFriendRequest
