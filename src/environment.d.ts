import { IUser } from "./domain/users/model/user.interface";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      PRODUCTION_DATABASE: string;
      DATABASE_LOCAL: string;
      PAGE_LIMIT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_COOKIE_EXPIRES_IN: string;
      SYSTEM_EMAIL_USERNAME: string;
      SYSTEM_EMAIL_PASSWORD: string;
      SYSTEM_EMAIL_HOST: string;
      SYSTEM_EMAIL_PORT: string;
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
