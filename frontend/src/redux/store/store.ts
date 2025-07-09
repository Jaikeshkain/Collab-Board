import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
    }
})

// ✅ Add this
export type RootState = ReturnType<typeof store.getState>;