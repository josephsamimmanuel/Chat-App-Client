import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../apiCallls/userRoute'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { setIsLoading } from '../redux/loader'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function ProtectedRoutes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.user)
  const token = sessionStorage.getItem('token')

  console.log(user?.data?.profilePicture)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          dispatch(setIsLoading(false))
          return navigate('/login')
        }

        dispatch(setIsLoading(true))
        const response = await getCurrentUser()
        if (response?.data) {
          dispatch(setIsLoading(false))
          dispatch(setUser(response))
        }
      } catch (error) {
        dispatch(setIsLoading(false))
        sessionStorage.removeItem('token')
        toast.error(error.response?.data?.message || 'Authentication failed')
        navigate('/login')
      } finally {
        dispatch(setIsLoading(false))
      }
    }
    fetchUser()
  }, [dispatch, navigate, token, location.pathname])

  if (!token || !user) {
    return navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-3 sm:p-4 border border-gray-200 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h1 className='text-xl sm:text-2xl font-bold truncate cursor-pointer' onClick={() => navigate('/')}>Hacker Chat</h1>
        {/* Profile Picture */}
        <div className='flex items-center gap-2'>
        <div className='flex  items-center gap-2 cursor-pointer' onClick={() => navigate(`/onboarding/${user?.data?._id}`)}>
          <img src={user?.data?.profilePicture} alt='profile' className='w-11 h-11 rounded-full' />
          <p className='text-sm sm:text-base'>{user?.data?.username}</p>
        </div>
        <button 
          className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition-colors duration-200' 
          onClick={() => {
            sessionStorage.removeItem('token')
            navigate('/login')
          }}
        >
          Logout
        </button>
        </div>
      </div>
      <div className="mt-16 sm:mt-20 flex-1 p-3 sm:p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedRoutes
