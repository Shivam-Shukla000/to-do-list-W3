import express from "express";
import {
  deleteGoal,
  getGoals,
  setGoal,
  updateGoal,
} from "../controller/goalController";
import { protect } from "../service/auth";
const goalRouter = express.Router();

goalRouter.get("/", protect, getGoals);
goalRouter.post("/", protect, setGoal);
goalRouter.put("/:id", protect, updateGoal);
goalRouter.delete("/:id", protect, deleteGoal);

export default goalRouter;
