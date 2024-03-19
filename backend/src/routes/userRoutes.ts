import express from "express";
import { loginUser, registerUser, getMe } from "../controller/userController";
import { protect } from "../service/auth";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/me", protect, getMe);
export default userRouter;
