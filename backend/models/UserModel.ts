import mongoose from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password:string
    createdAt:string;
    updatedAt:string;
  }

const userSchema=new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);

export default User;