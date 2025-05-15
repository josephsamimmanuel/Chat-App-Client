import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../apiCallls/userRoute'
import { setUser } from '../redux/userSlice'
import { setIsLoading } from '../redux/loader'
import toast from 'react-hot-toast'

function PublicRoute() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const checkUser = async () => {
      if (token && !user) {
        try {
          dispatch(setIsLoading(true))
          const response = await getCurrentUser()
          if (response?.data) {
            dispatch(setIsLoading(false))
            dispatch(setUser(response))
            navigate('/')
          }
        } catch (error) {
          toast.error(error.response.data.message)
          sessionStorage.removeItem('token')
          dispatch(setIsLoading(false))
        }
      }
      dispatch(setIsLoading(false))
    }
    checkUser()
  }, [token, user, dispatch, navigate])

  if (token && user) {
    navigate('/')
    return null
  }

  return <Outlet />
}

export default PublicRoute 