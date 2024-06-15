const TaskModel = require("../models/Task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUserTask = async (req, res) => {
  const jwtToken = req.cookies.jwt;
  try {
    const decodedToken = jwt.verify(jwtToken, process.env.secretKey);
    const userId = decodedToken.id;
    const userTasks = await TaskModel.find({ user: userId });
    console.log(userTasks);
    res.status(201).json({ userTasks });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.addTask = async (req, res) => {
  const jwtToken = req.cookies.jwt;
  try {
    const { title } = req.body;
    const decodedToken = jwt.verify(jwtToken, process.env.secretKey);
    const userId = decodedToken.id;
    console.log(userId);

    const newTask = await TaskModel.create({ title, user: userId });
    console.log(newTask);
    res.status(201).json({ message: "Task was save it in Database!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Update task title and progress
exports.updateTask = async (req, res) => {
  try {
    const { title, taskId, completed } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, {
      title,
      completed,
    });
    console.log(updatedTask);
    res.status(201).json({ message: "Task was a successfully updated!" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await TaskModel.deleteOne({ _id: taskId });
    if (!task.deletedCount) {
      throw new Error("Task not found");
    }
    res.status(201).json({ message: "Task was a successfully deleted!" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
