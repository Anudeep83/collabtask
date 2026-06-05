import mongoose, { Schema } from "mongoose";

const ActivitySchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    user: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity =
  mongoose.models.Activity ||
  mongoose.model(
    "Activity",
    ActivitySchema
  );

export default Activity;