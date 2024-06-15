const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 60 * 60;

const createToken = (id) => {
  // What does it does? 3 parameters?
  return jwt.sign({ id }, process.env.secretKey, {
    expiresIn: maxAge, //seconds
  });
};

exports.signUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await User.create({ username, password, email });
    const token = createToken(newUser._id);
    //create a cookie, what does it do?,{ only via http the cookie will be access, the lifespan of the cookie will be 3 hours (milliseconds)}
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(200)
      .json({ message: "Username was added it to the database!!", newUser });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(404).json({ errors });
  }
};

// Look for the user and give an assign a cookie to him
exports.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    const errors = handleErrors(error);
    console.log(error);
    res.status(404).json({ errors });
  }
};

exports.logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ message: "You were log out!" });
};

exports.someOtherRoute = (req, res) => {
  try {
    const jwtToken = req.cookies.jwt;
    const x = jwt.verify(jwtToken, process.env.secretKey);
    console.log(jwtToken);
    console.log(x);
    res.json({ x });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(404).json({ errors });
  }
};
