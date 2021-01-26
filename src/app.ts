import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import productRouter from "./routes/product.router";
import { APPError } from "./error/app.error";
import { globalErrorController } from "./error/global.error.controller";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(APPError.create(`this ${req.originalUrl} not found!`, 404));
});

app.use(globalErrorController);

export default app;
