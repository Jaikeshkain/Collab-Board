import express, { RequestHandler } from "express";
import { createLog, getLogs } from "../controllers/LogController";
const router=express.Router();

router.get("/",getLogs as RequestHandler);
router.post("/",createLog as RequestHandler);

export default router;