import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/reducer";
import ProtectedRoutes from "./routes/protectedRoutes";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import Loader from "./components/Loader";
import './stylesheets/loader.css';
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" /> 
      <Loader  />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
