import axios from "axios";

export const ApiURL=import.meta.env.VITE_BACKEND_URL

export const LoginAPI=async(body:any)=>{
    try {
        const response=await axios.post(`${ApiURL}/api/auth/login`,body);
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}

export const RegisterAPI=async(body:any)=>{
    try {
        const response=await axios.post(`${ApiURL}/api/auth/register`,body);
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}

export const LogoutAPI=async()=>{
    try {
        const response=await axios.post(`${ApiURL}/api/auth/logout`,{});
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}