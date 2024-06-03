const app = require("express");
const route = app.Router();
const userControllers = require("../controllers/UserAuthentication");

route.post("/signUp", userControllers.addUser);
route.post("/login", userControllers.login);

module.exports = route;
