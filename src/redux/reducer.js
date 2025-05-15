import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loader";

const store = configureStore({
    reducer: {
        user: userReducer,
        loader: loaderReducer,
    },
    devTools: true,
});

export default store;
