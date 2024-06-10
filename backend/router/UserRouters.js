const app = require("express");
const route = app.Router();
const userControllers = require("../controllers/UserAuthentication");

route.post("/signUp", userControllers.signUp);
route.post("/login", userControllers.login);
route.get("/logOut", userControllers.logOut);

module.exports = route;
