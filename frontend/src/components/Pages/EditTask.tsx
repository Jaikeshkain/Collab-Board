import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { createTask } from "../../services/TaskService";
import "../../styles/CreateTask.css"
import { logAction } from "../../utils/logAction";

const EditTask = () => {
  const {token,user}=useSelector((state:RootState)=>state?.auth?.user)
  const [isLoading,setIsLoading]=useState<Boolean>(false)
  const [success,setSuccess]=useState<Boolean>(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  const [error, setError] = useState("");

    const forbiddenTitles=["todo","in progress","done"]
    const titleLower=formData.title.trim().toLowerCase()

  const handleChange = (e:any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const mutation=useMutation({
    mutationFn:(body:any)=>createTask(body,token as string),
    mutationKey:["create-task"],
    onMutate:()=>{
        setIsLoading(true)
    },
    onError:(error)=>{
        setError(error.message)
        setIsLoading(false)
    },
    onSuccess:async(data)=>{
        setSuccess(true)
        setIsLoading(false)
        // navigate("/")
        await logAction({
          actionType: "create",
          taskId: data.createTask._id,
          userId: user._id,
          details: `'${data.createTask.title}'`
    });
    }
  })

  const handleCreate=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(forbiddenTitles.includes(titleLower)){
        setError("Task title cannot be the same as column names (Todo, In Progress, Done).")
        return
    }
    mutation.mutate(formData)

  }


  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>

      {error && <p className="error">{error}</p>}
      {isLoading && <p>Loading...</p>}
      {success && <p>Successfully created</p>}
      <form onSubmit={handleCreate}  className="task-form">
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title must be unique" required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>

        <label>
          Priority:
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </label>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default EditTask;
