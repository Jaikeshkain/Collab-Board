import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import User from "../models/UserModel";
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      !req.headers?.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
