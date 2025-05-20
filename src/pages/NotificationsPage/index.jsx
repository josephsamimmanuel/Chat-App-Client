import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequests } from '../../apiCallls/friendRequestRoute';
import { setFriendRequest } from '../../redux/friendRequest';
import toast from 'react-hot-toast';
import { CiLocationOn } from 'react-icons/ci';
import moment from 'moment';
import { setIsLoading } from '../../redux/loader';
import { ComponentLoader } from '../../components/Loader';


function NotificationsPage() {
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
            setAllRequests(response.incomingRequests);
            dispatch(setFriendRequest({
              incomingRequests: response.incomingRequests,
              outgoingRequests: response.outgoingRequests,
              acceptedRequests: response.acceptedRequests,
              rejectedRequests: response.rejectedRequests,
            }));
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

console.log(allRequests);
  return (
    <div className='container mx-auto px-4 py-6'>
      <h2 className='text-2xl font-bold mb-6'>Notification: Recieved Friend Requests</h2>
      {allRequests.length === 0 ? (
        <div className='flex flex-col gap-2 p-4 w-full h-full justify-center items-center'>
          <p className='text-sm sm:text-base font-medium'>No recieved friend requests</p>
          {isLoading && <ComponentLoader />}
        </div>
      ) : (
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
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>Recieved At: {moment(request?.createdAt).format('DD/MM/YYYY HH:mm A')}</p>
        </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default NotificationsPage