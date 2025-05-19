import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../apiCallls/userRoute'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { setIsLoading } from '../redux/loader'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import DialogBox from '../components/dialogBox'
import ThemeSelector from '../components/themeSelector'

function ProtectedRoutes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isOnboarding = location.pathname.split('/')[1] === 'onboarding'

  const { user } = useSelector((state) => state.user)
  const friendRequest = useSelector((state) => state.friendRequest)
  const token = sessionStorage.getItem('token')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-3 sm:p-4 border border-gray-200 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h1 className='text-xl sm:text-2xl font-bold truncate cursor-pointer' onClick={() => navigate('/')}>Hacker Chat</h1>
        {isOnboarding && <p className='text-sm sm:text-base font-semibold text-gray-500'>Welcome, {user?.data?.username}</p>}
        <div className='flex items-center gap-2 sm:gap-12'>
          {/* Notification Icon */}
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <IoNotificationsCircleSharp onMouseEnter={() => setNotificationDropdownOpen(true)} onMouseLeave={() => setNotificationDropdownOpen(false)} onClick={() => navigate(`/notifications`)} className='w-8 h-8 cursor-pointer' />
              <div className='absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center'>
                <span className='text-xs text-white'>{friendRequest?.incomingRequests?.length}</span>
              </div>
            </div>
          </div>
          {/* Notification Dropdown */}
          {notificationDropdownOpen && (
            <div className='absolute top-12 right-4 sm:right-60 w-64 sm:w-48 bg-white border border-gray-200 rounded shadow-md z-10'>
              <ul className='text-sm text-gray-700 p-2'>
                <li>
                  You have {friendRequest?.incomingRequests?.length} new notifications
                </li>
              </ul>
            </div>
          )}
          {/* Theme Icon */}
          <div className='flex items-center gap-2'>
            <div className='relative' tabIndex={0} onBlur={() => setThemeDropdownOpen(false)}>
              <LuSunMoon
                className='w-8 h-8 cursor-pointer'
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              />
              {/* Theme Dropdown Menu */}
              <ThemeSelector themeDropdownOpen={themeDropdownOpen} setThemeDropdownOpen={setThemeDropdownOpen} />
            </div>
          </div>
          {/* LogoutIcon */}
          <div className='flex items-center gap-2'>
            <RiLogoutCircleRFill className='w-8 h-8 cursor-pointer' onClick={() => setDialogBoxOpen(true)} />
          </div>
          {/* Profile Picture */}
          <div className='flex items-center gap-2'>
            <div className='relative' tabIndex={0} onBlur={() => setDropdownOpen(false)}>
              <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={user?.data?.profilePicture} alt='profile' className='w-11 h-11 rounded-full' />
              </div>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10'>
                  <ul className='text-sm text-gray-700'>
                    <li className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold flex gap-4 items-center'>
                      <img src={user?.data?.profilePicture} alt='profile' className='w-11 h-11 rounded-full border-2 border-gray-300' />
                      <p className='text-sm sm:text-base'>{user?.data?.username}</p>
                    </li>
                    <hr className='w-full h-1 bg-gray-200' />
                    <li onClick={() => navigate(`/`)} className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold'>
                      Home
                    </li>
                    <li onClick={() => navigate(`/onboarding/${user?.data?._id}`)} className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold'>
                      View Profile
                    </li>
                    <li onClick={() => navigate(`/send-friend-request`)} className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold'>
                      Sent Request
                    </li>
                    <li onClick={() => navigate(`/recieved-friend-request`)} className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold'>
                      Received Request
                    </li>
                    <li onClick={() => navigate(`/notifications`)} className='hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold'>
                      Notifications
                    </li>
                    <li onClick={() => {
                      sessionStorage.removeItem('token')
                      navigate('/login')
                    }} className='hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600 font-bold'>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-24 flex-1 p-3 sm:p-4">
        <Outlet />
      </div>
      {dialogBoxOpen && <DialogBox handleLogout={handleLogout} setDialogBoxOpen={setDialogBoxOpen} content='Are you sure you want to logout?' logoutButtonText='Log Out' cancelButtonText='Cancel' />}
    </div>
  )
}

export default ProtectedRoutes
