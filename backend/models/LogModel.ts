import mongoose from "mongoose";

const logSchema=new mongoose.Schema({
    actionType: { type: String, enum: ["create", "update", "delete", "move", "reassign"], required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    details: { type: String, required: true },
  },{timestamps:true});

const Log=mongoose.model("Log",logSchema);
export default Log;