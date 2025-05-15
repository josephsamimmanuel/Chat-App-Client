import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from '../apiCallls/userRoute'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { setIsLoading } from '../redux/loader'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function ProtectedRoutes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          dispatch(setIsLoading(false))
          return navigate('/login')
        }

        const response = await getCurrentUser()
        if (response?.data) {
          dispatch(setIsLoading(false))
          dispatch(setUser(response))
        }
      } catch (error) {
        dispatch(setIsLoading(false))
        sessionStorage.removeItem('token')
        toast.error(error.response.data.message)
      } finally {
        dispatch(setIsLoading(false))
      }
    }
    fetchUser()
  }, [dispatch, token])

  if (!token || !user) {
    return navigate('/login')
  }

  return <Outlet />
}

export default ProtectedRoutes
