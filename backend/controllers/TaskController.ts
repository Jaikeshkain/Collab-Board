import { Request,Response } from "express";
import Task from "../models/TaskModel";
import { io } from "../app";
import User from "../models/UserModel";

//create task
export const createTask=async(req:Request,res:Response)=>{
    const {title,description,priority}=req.body
    try {
        const userData=req.user
        const titleExist=await Task.findOne({title})
        if(titleExist){
            return res.status(404).json({message:"This title already exist"})
        }
        const createTask=await Task.create({
            createdBy:userData._id,title,description,priority
        })
        if(!createTask){
            return res.status(404).json({message:"Error while creating task"})
        }
        io.emit("taskCreated", createTask);
        res.status(201).json({message:"Task created successfully",createTask})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//fetch all task
export const getAllTasks=async(req:Request,res:Response)=>{
    try {
       const tasks=await Task.find()
  .populate("assignedUser", "username")
  .populate("createdBy", "username");

       if(tasks.length<1){
        return res.status(404).json({message:"No task found"})
       } 
       res.status(201).json({message:"Success",tasks})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//edit task
export const dragTask=async(req:Request,res:Response)=>{
    const updates=req.body
    const {id}=req.params
    try {
        const updatedTask=await Task.findByIdAndUpdate(id,{...updates,updatedAt:Date.now()},{new:true,runValidators:true})
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        io.emit("taskUpdated", updatedTask);
        res.status(200).json({message:"Task updated successfully",updatedTask});
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//delete task
export const deleteTask=async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const deletedTask=await Task.findByIdAndDelete(id)
        if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    io.emit("taskDeleted", id);
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//smart assign
export const smartAssignTask = async (req:Request, res:Response) => {
  try {
    // 1. Get all users
    const users = await User.find();

    // 2. Count active tasks (status ≠ Done) per user
    const taskCounts = await Promise.all(
      users.map(async (user) => {
        const count = await Task.countDocuments({
          assignedUser: user._id,
          status: { $ne: "Done" },
        });
        return { user, count };
      })
    );

    // 3. Find user with the fewest active tasks
    const leastBusy = taskCounts.sort((a, b) => a.count - b.count)[0];

    if (!leastBusy) return res.status(404).json({ message: "No users found." });

    // 4. Assign task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedUser: leastBusy.user._id, status:"In Progress" },
      { new: true }
    );

    // 5. Emit and return
    io.emit("taskUpdated", updatedTask);

    // Optionally log it
    io.emit("newLog", {
      actionType: "reassign",
      taskId: updatedTask?._id,
      userId: leastBusy.user._id,
      details: `Task "${updatedTask?.title}" was smart-assigned to ${leastBusy.user.username}`,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Smart Assign error:", err);
    res.status(500).json({ message: "Smart assign failed", error: err });
  }
};

//fetch task by id
export const getTaskById=async(req:Request,res:Response)=>{
    const {id}=req.body
    try {
        const task=await Task.findById(id)
        res.status(201).json({task})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Smart assign failed" });
    }
}