// types/express/index.d.ts
import type { IUser } from "../../models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or whatever your user type is
    }
  }
}
