// types/express/index.d.ts
import User from "../../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: User; // or whatever your user type is
    }
  }
}
