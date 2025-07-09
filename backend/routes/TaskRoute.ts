import express, { RequestHandler } from "express";
const router=express.Router();
import { createTask, deleteTask, dragTask, getAllTasks, getTaskById, smartAssignTask } from "../controllers/TaskController";
import { protect } from "../middleware/auth";

router.post("/create-task",protect as RequestHandler,createTask as RequestHandler);
router.get("/getAllTasks",getAllTasks as RequestHandler);
router.get("/task-by-id",getTaskById as RequestHandler);

router.post("/:id/smart-assign", smartAssignTask as RequestHandler);
router.put("/:id/drag-task",dragTask as RequestHandler);

router.delete("/:id/delete-task",protect as RequestHandler,deleteTask as RequestHandler);


export default router;