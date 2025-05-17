import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { getFriendRequests, acceptFriendRequest } from '../../apiCallls/friendRequestRoute';
import toast from 'react-hot-toast';

function RecievedFriendRequest() {
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        fetchAllRequests();
    }, []);

    const fetchAllRequests = async () => {
      try {
          const response = await getFriendRequests();
          if (response) {
              setAllRequests(response.incomingRequests);
              toast.success(response.message);
          }
          else {
              toast.error(response.message);
          }
      } catch (error) {
          toast.error(error.response.data.message);
      }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await acceptFriendRequest(requestId);
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
      <h2 className='text-2xl font-bold mb-6'>Recieved Friend Requests</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {allRequests.map((request) => (
        <div className='flex flex-col gap-2 border border-gray-300 rounded-md p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200'>
          <div className='flex items-center gap-3'>
            <img
              src={request?.sender?.profilePicture}
              className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-200'
              alt="Profile"
            />
            <div className='flex flex-col flex-1 min-w-0'>
              <p className='text-sm sm:text-base font-medium truncate'>{request?.sender?.username}</p>
              <span className='text-xs sm:text-sm text-gray-500 flex items-center gap-1 truncate'>
                <CiLocationOn className='text-base sm:text-lg flex-shrink-0' />
                <span className='truncate'>{request?.sender?.location}</span>
              </span>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 mt-2'>
            <p className='text-xs sm:text-sm font-medium bg-lime-200 border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Native: {request?.sender?.nativeLanguage}</p>
            <p className='text-xs sm:text-sm font-medium border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center truncate'>Learning: {request?.sender?.learningLanguage}</p>
          </div>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>id: {request?._id}</p>
          <div className='flex gap-2 justify-center'>
          <button onClick={() => handleAcceptRequest(request?._id)} className=' w-1/2 btn btn-primary border border-gray-300 rounded-3xl mt-3 text-sm sm:text-base py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-md'>
            Accept
          </button>
          <button  className=' w-1/2 btn btn-primary border border-gray-300 rounded-3xl mt-3 text-sm sm:text-base py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-md'>
            Decline
          </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default RecievedFriendRequest
