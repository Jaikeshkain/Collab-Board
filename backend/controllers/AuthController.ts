import type { Request,Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/UserModel";

export const register=async(req:Request,res:Response)=>{
    const {username,email,password}=req.body;
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({username,email,password:hashedPassword})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        res.status(201).json({message:"Account created successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Invalid credentials"})
        }
        const matchPassword=await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(404).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET as string,{expiresIn:"29d"})
        res.status(201).json({message:"Login successful",token,user})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout=(req:Request,res:Response)=>{
    try {
        res.clearCookie("token");
        console.log("Logout successful");
        res.status(200).json({message:"Logout successful"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}