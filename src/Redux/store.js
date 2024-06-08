import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"
import urlReducer from "./slices/urlSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        url: urlReducer
    }
})