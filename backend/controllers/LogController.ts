import { Request, Response } from "express";
import Log from "../models/LogModel";
import { io } from "../app";

export const createLog=async(req:Request,res:Response)=>{
    try {
        const newLog=await Log.create(req.body)
        io.emit("newLog",newLog)
        res.status(201).json({message:"Success",newLog})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getLogs = async (req:Request, res:Response) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }).limit(20).populate("userId", "username");
    res.status(200).json(logs);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error fetching logs"});
  }
};