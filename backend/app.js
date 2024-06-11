const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Ensures cookies are accepted from the frontend
  })
);

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
  app.listen(3000, () => console.log("Backend is running!"))
);

app.use("/", userRoutes);

/*
- Review Authentication code and adjust the changes to the frontend
- Store tasks in database
*/
