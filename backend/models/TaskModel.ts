import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    status:{type:String,enum:["In Progress","Todo","Done"],default:"Todo"},
    priority:{type:String,enum:["High","Medium","Low"],default:"Medium"},
    assignedUser:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:"User"
    }

},{timestamps:true});

const Task=mongoose.model("Task",taskSchema);
export default Task;