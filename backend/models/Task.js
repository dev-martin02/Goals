const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String }, // Optional, for detailed task descriptions
    completed: { type: Boolean, default: false }, // Track task completion status
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Link to the associated user
    createdAt: { type: Date, default: Date.now }, // Timestamp of task creation
    updatedAt: { type: Date, default: Date.now }, // Timestamp of last update
  },
  { timestamps: true }
);

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;
