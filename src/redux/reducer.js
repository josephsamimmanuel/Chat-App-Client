import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loader";
import themeReducer from "./useTheme";
import friendRequestReducer from "./friendRequest";

const store = configureStore({
    reducer: {
        user: userReducer,
        loader: loaderReducer,
        theme: themeReducer,
        friendRequest: friendRequestReducer,
    },
    devTools: true,
});

export default store;
