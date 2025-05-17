import React, { useEffect, useState } from 'react'
import { getFriendRequests } from '../../apiCallls/friendRequestRoute';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setFriendRequest } from '../../redux/friendRequest';
import { useNavigate } from 'react-router-dom';

function Friends() {
    const [allRequests, setAllRequests] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllRequests();
    }, []);

    const fetchAllRequests = async () => {
        try {
            const response = await getFriendRequests();
            if (response) {
                setAllRequests(response.acceptedRequests);
                dispatch(setFriendRequest({
                    incomingRequests: response.incomingRequests,
                    outgoingRequests: response.outgoingRequests,
                    acceptedRequests: response.acceptedRequests,
                    rejectedRequests: response.rejectedRequests,
                }));
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
        <div className='w-full'>
                {allRequests.length === 0 ? (
                    <div className='flex flex-col gap-2 p-4 w-full h-full justify-center items-center'>
                        <p className='text-sm sm:text-base font-medium'>No friends yet. Send a friend request to someone to start chatting!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {allRequests.map((request) => (
                            <div className='flex flex-col gap-2 border border-gray-300 rounded-md p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200'>
                                <div className='flex items-center gap-2'>
                                    <img
                                        src={request?.user?.profilePicture}
                                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'
                                        alt="Profile"
                                    />
                                    <p className='text-sm sm:text-base font-medium'>{request?.user?.username}</p>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2'>
                                    <p className='text-xs sm:text-sm font-medium bg-lime-200 border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center'>Native: {request?.user?.nativeLanguage}</p>
                                    <p className='text-xs sm:text-sm font-medium border w-full sm:w-1/2 border-gray-300 rounded-3xl px-2 py-1 text-center'>Learning: {request?.user?.learningLanguage}</p>
                                </div>
                                <button onClick={() => navigate(`/chat/${request?.user?._id}`)} className='w-full btn btn-primary border border-gray-300 rounded-3xl mt-2 text-sm sm:text-base py-1.5 hover:bg-blue-700 transition-colors duration-200'>
                                    Message
                                </button>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Friends