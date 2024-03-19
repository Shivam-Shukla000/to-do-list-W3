import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenModel from "../model/tokenModel";
import mongoose, { Document, ObjectId, mongo } from "mongoose";

import { Express, Request, Response } from "express";
import log from "../logger/";
import userModel from "../model/userModel";
dotenv.config();
const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "add all fields" });
      return;
    }
    const USerExist = await userModel.findOne({ email });
    if (USerExist) {
      res.status(400).json({ message: "user already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res
        .status(201)
        .json({ _id: user.id, name: user.name, email: user.email });
    } else {
      res.status(400).json({
        message: "user not created",
      });
    }
  } catch (error) {
    log.error(error);
  }
};
interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("invalid ");
      res.status(401).json({
        message: "invalid credential",
      });
      return;
    } else {
      const user: IUser | null = await userModel.findOne({ email });
      console.log(user);
      if (user !== null) {
        const data: boolean = await bcrypt.compare(password, user.password);

        if (data) {
          const userId = user._id.toString();

          const accessToken = generateAccessToken(userId);
          const refreshToken = generateRefreshToken(userId);
          await tokenModel.create({ refreshToken });

          res.status(200).json({
            id: userId,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          console.log("ran");
        }
      } else {
        res.status(400).json({
          message: "invalid credential",
        });
      }
    }
  } catch (error) {
    console.log("try catch");
    log.error(error);
  }
};
const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_KEY as string, {
    expiresIn: "24h",
  });
};
const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_KEY as string);
};
const getMe = async (req: Request, res: Response) => {
  try {
    const me = await userModel.findById(req.user._id);
    if (!me) {
      res.status(401).json({ message: "couldnt find user in database" });
      return;
    }
    res.status(200).json({
      id: me?._id,
      email: me?.email,
      name: me?.name,
    });
  } catch (error) {
    log.error(error);
  }
};

export { registerUser, loginUser, getMe };
