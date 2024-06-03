const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Why this line of code?
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const userRoutes = require("./router/UserRouters");

async function connectionToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/goals");
    console.log("The connection to the dataBase was a success");
  } catch (error) {
    console.log(error.message);
  }
}
connectionToDB().then(() =>
  app.listen(3000, (req, res) => console.log("Backend is running! "))
);

app.use("/", userRoutes);
