import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
dotenv.config();

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken: string | null = null;
  if (
    req.headers["authorization"] &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      accessToken = req.headers.authorization.split(" ")[1];
      const accessKey = process.env.ACCESS_KEY as string;
      const decoded = jwt.verify(accessToken, accessKey) as JwtPayload;

      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "not authorized" });
    }
  }
  if (!accessToken) {
    res.status(401).json({ message: "not authorized, no token" });
  }
};
export { protect };
