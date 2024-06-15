const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secretKey, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json({ message: err.message });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Your not authenticated!!" });
  }
};

module.exports = { requireAuth };
