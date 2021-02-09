import dotenv from "dotenv";
dotenv.config({
  path: "src/config.env",
});
import "reflect-metadata";
import mongoose from "mongoose";
import app from "./app";
let Database = process.env.PRODUCTION_DATABASE;
if (process.env.NODE_ENV === "development") {
  Database = process.env.DATABASE_LOCAL;
}

mongoose.connect(
  Database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log(`mongoose connected to database!`);
  }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server connecting on port ${port}`);
});
