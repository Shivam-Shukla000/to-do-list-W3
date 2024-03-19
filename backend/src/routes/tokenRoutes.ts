import express from "express";
import { generateAccessToken, logout } from "../controller/tokenController";
const tokenRouter = express.Router();

tokenRouter.get("/", generateAccessToken);
tokenRouter.delete("/logout/:a", logout);

export default tokenRouter;
