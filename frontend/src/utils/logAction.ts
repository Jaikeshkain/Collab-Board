// utils/logAction.ts
import axios from "axios";
import socket from "../lib/socket";
import { ApiURL } from "../services/AuthService";

export const logAction = async (logData: any) => {
  // Show log immediately (optimistic UI)
  console.log("call")
  socket.emit("newLog", logData); // optional, for real-time emit
  try {
    await axios.post(`${ApiURL}/api/logs`, logData);
  } catch (err) {
    console.error("Log error:", err);
  }
};
