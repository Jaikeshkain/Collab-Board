import axios from "axios"
import { ApiURL } from "./AuthService"

export const getAllTasks=async()=>{
    try {
        const response=await axios.get(`${ApiURL}/api/tasks/getAllTasks`)
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}

export const createTask=async(body:any,token:string)=>{
    try {
        const response=await axios.post(`${ApiURL}/api/tasks/create-task`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}

export const updateTask=async(taskData:any,id:string)=>{
    try {
    const res = await axios.put(`${ApiURL}/api/tasks/${id}/update-task`, taskData);
    return { success: true, task: res.data };
  } catch (err: any) {
    if (err.response?.status === 409) {
      return {
        success: false,
        conflict: true,
        serverVersion: err.response.data.serverTask,
        message: "Conflict detected",
      };
    }

    return {
      success: false,
      conflict: false,
      message: "Update failed",
      error: err,
    };
  }
}

export const deleteTask=async(id:string,token:string)=>{
    try {
        const response=await axios.post(`${ApiURL}/api/tasks/${id}/delete-task`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}

//get task by id
export const getTaskById=async(id:string)=>{
    try {
        const response=await axios.post(`${ApiURL}/api/tasks/task-by-id`,{id})
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data?.message)
    }
}