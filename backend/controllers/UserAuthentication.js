const User = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.find({ username });
    if (user.length !== 0) {
      throw new Error("This Username is already in use");
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    res
      .status(200)
      .json({ message: "Username was added it to the database!!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username });
    console.log(user);
    if (user.length === 0) {
      throw new Error("User do not exist");
    } else if (user[0].password !== password) {
      throw new Error("Incorrect Password");
    }
    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
