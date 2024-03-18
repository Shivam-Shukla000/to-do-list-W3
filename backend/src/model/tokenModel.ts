import mongoose, { Document } from "mongoose";

interface IToken extends Document {
  refreshToken: string;
  createdAt: Date;
  updartedAt: Date;
}

const tokenSchema = new mongoose.Schema<IToken>(
  {
    refreshToken: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const tokenModel = mongoose.model<IToken>("RefreshToken", tokenSchema);
export default tokenModel;
