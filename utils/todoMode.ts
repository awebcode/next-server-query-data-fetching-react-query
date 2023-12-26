import mongoose, { Schema } from "mongoose";

const todosSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const todoModel = mongoose.models.todos || mongoose.model("todos", todosSchema);
