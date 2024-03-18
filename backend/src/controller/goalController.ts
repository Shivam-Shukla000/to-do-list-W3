import mongoose, { ObjectId } from "mongoose";
import goalModel from "../model/goalModel";
import { Request, Response } from "express";
import userModel from "../model/userModel";

// interface AuthorizedRequest extends Request {
//   user: {
//     _id: mongoose.Types.ObjectId;
//     name: string;
//     email: string;
//   };
// }

const getGoals = async (req: Request, res: Response) => {
  const goals = await goalModel.find({ user: req.user._id });
  res.status(200).json(goals);
};

const setGoal = async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400).json({ message: "no data was sent" });
    return;
  }

  const goal = await goalModel.create({
    goal: req.body.text,
    user: req.user._id,
  });

  res.status(200).json(goal);
};
const updateGoal = async (req: Request, res: Response) => {
  const goal = await goalModel.findById(req.query.id);
  if (!goal) {
    res.status(400).json({ message: "goal not found" });
    return;
  }

  if (goal?.user.toString() !== req.user._id?.toString()) {
    res.status(401).json({ message: "user not authorized" });
    return;
  }
  const updatedGoal = await goalModel.findByIdAndUpdate(
    req.query.id,
    { goal: req.body.text },
    {
      new: true,
    }
  );
  res.status(200).json(updatedGoal);
};
const deleteGoal = async (req: Request, res: Response) => {
  const goal = await goalModel.findById(req.query.id);
  if (!goal) {
    res.status(400).json({ message: "goal not found" });
    return;
  }
  if (goal.user.toString() !== req.user._id?.toString()) {
    res.status(401).json({ message: "user not authorized" });
    return;
  }

  await goal.deleteOne();
  res.status(200).json({ id: req.query.id });
};

export { getGoals, setGoal, updateGoal, deleteGoal };
