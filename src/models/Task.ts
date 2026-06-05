import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },

    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    comments: [
      {
        user: {
          type: String,
          required: true,
        },

        text: {
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task =
  mongoose.models.Task ||
  mongoose.model("Task", TaskSchema);

export default Task;