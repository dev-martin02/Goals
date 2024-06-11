const TaskModel = require("../models/Task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.deleteTask = async (req, res) => {};
module.updateTask = async (req, res) => {};
