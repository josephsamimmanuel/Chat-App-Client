import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/reducer";
import Loader from "./components/Loader";
import './stylesheets/loader.css';
import CommonRoutes from "./routes/commonRoutes";
function App() {
  return (
    <div className="h-screen">
      <Provider store={store}>
        <Toaster position="top-right" />
        <Loader />
        <CommonRoutes />
      </Provider>
    </div>
  )
}

export default App
