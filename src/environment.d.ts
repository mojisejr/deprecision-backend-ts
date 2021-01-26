import { IUser } from "./domain/users/model/user.interface";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      DATABASE_LOCAL: string;
      PAGE_LIMIT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
export {};
