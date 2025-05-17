import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import Login from '../pages/Login'
import ProtectedRoutes from './protectedRoutes'
import Home from '../pages/Home'
import NotificationsPage from '../pages/NotificationsPage'
import CallPage from '../pages/CallPage'
import ChatPage from '../pages/ChatPage'
import Onboarding from '../pages/Onboarding'
import RecievedFriendRequest from '../pages/FriendRequest/recievedFriendRequest'
import SendFriendRequest from '../pages/FriendRequest/sendFriendRequest'
import { useSelector } from 'react-redux'

function CommonRoutes() {
    const theme = useSelector((state) => state.theme)
    console.log(theme)
    return (
        <div data-theme={theme}>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/call" element={<CallPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/onboarding/:id" element={<Onboarding />} />
                        <Route path="/recieved-friend-request" element={<RecievedFriendRequest />} />
                        <Route path="/send-friend-request" element={<SendFriendRequest />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default CommonRoutes
