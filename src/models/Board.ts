import mongoose, { Schema } from "mongoose";

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Board =
  mongoose.models.Board ||
  mongoose.model("Board", BoardSchema);

export default Board;