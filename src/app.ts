import path from "path";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
//ROUTER
import userRouter from "./routes/user.router";
import productRouter from "./routes/product.router";
import viewsRouter from "./routes/views.router";

import { APPError } from "./error/app.error";
import { globalErrorController } from "./error/global.error.controller";

const app = express();

app.set("view engine", "pug");
//ตรงนี้เวลา serve static file จะต้องใช้ lib path
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this IP please try again in an hour",
});

const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://deprecision.co"]
      : "http://localhost:8100",
};

app.use(cors(corsOptions));
// app.options("*", (next: NextFunction) => {
//   console.log("cors in option call");
//   cors(corsOptions);
//   next();
// });
app.use(express.json());
app.use(cookieParser());
//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
//TODO: find some lib

//Prevent HTTP Params Pollution eg. double query param
app.use(
  hpp({
    //อันไหนจะให้ซ้ำได้ก็กำหนดตรงนี้
    whitelist: [],
  })
);

//API ROUTEs
app.use(helmet());
//middleware to fixed the issue about csp of third party javascript
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdnjs.cloudflare.com; object-src 'self'"
  );
  next();
});
app.use("/", viewsRouter);
app.use("/api", limiter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(APPError.create(`this ${req.originalUrl} not found!`, 404));
});

app.use(globalErrorController);

export default app;
