import express from "express";
import log from "./logger";
import connect from "./db/connect";
import userRouter from "./routes/userRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import goalRouter from "./routes/goalRoutes";

dotenv.config();

const port: number | undefined = parseInt(process.env.PORT as string);
const host: string = process.env.HOST as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: mongoose.Types.ObjectId | null;
        name: string | null;
        email: string | null;
      };
    }
  }
}

app.use("/user", userRouter);
app.use("/goal", goalRouter);

app.listen(port, host, () => {
  log.info(`listning at port ${port}`);
  connect();
});
