import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")!):null
    },

    reducers:{
        loginAction:(state,action)=>{
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
            state.user=action.payload;
        },
        logoutAction:(state)=>{
            state.user=null;
            localStorage.removeItem("userInfo");
        },
    }
})

export const {loginAction,logoutAction}=authSlice.actions;
export default authSlice.reducer;
