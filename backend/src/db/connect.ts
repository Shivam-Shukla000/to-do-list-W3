import mongoose from "mongoose";
import log from "../logger";
import dotenv from "dotenv";

dotenv.config();

function connect() {
  const dbUri = process.env.DB_URI as string;
  try {
    mongoose.connect(dbUri);
    log.info("mongodb connected");
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
