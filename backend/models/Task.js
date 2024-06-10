const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    taskName: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;
