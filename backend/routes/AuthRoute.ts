import express, { RequestHandler } from "express";
const router=express.Router();
import { register,login, logout } from "../controllers/AuthController";

router.post("/register",register as RequestHandler);
router.post("/login",login as RequestHandler);
router.post("/logout",logout as RequestHandler);


export default router;