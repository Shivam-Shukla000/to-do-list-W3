import dotenv from "dotenv";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
dotenv.config();
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import tokenModel from "../model/tokenModel";
const generateAccessToken = async (req: Request, res: Response) => {
  const { refreshToken, id } = req.body;
  if (!refreshToken || !id) {
    res.status(401).json({ message: "user not authorized no token" });
    return;
  }
  const jwtDecoded = (await jwtDecode(refreshToken)) as JwtPayload;
  const user = await userModel.findOne({ _id: jwtDecoded.id });
  if (!user || id !== user._id.toString()) {
    res.status(401).json({ message: "user not authorized" });
    return;
  }
  const accessToken = jwt.sign({ id }, process.env.ACCESS_KEY as string, {
    expiresIn: "24h",
  });
};

const logout = async (req: Request, res: Response) => {
  const refreshToken = req.params.refreshToken;
  if (!refreshToken) {
    res.status(400).json({ message: "no token found" });
  }
  await tokenModel.findOneAndDelete({ refreshToken });
  console.log(refreshToken);
  res.status(200).json({ message: "logged out" });
};

export { generateAccessToken, logout };
