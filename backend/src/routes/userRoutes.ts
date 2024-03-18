import express from "express";
import { loginUser, registerUser } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/me", registerUser);
export default userRouter;
