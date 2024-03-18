import mongoose, { Document } from "mongoose";

interface IGoal extends Document {
  goal: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new mongoose.Schema<IGoal>(
  {
    goal: {
      type: String,
      required: [true, "please add data"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const goalModel = mongoose.model<IGoal>("Goal", goalSchema);
export default goalModel;
