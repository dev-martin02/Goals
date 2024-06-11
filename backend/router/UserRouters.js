const app = require("express");
const route = app.Router();
const userControllers = require("../controllers/UserAuthentication");
const taskControllers = require("../controllers/UserTask");
const authMiddleware = require("../middleware/authMiddleware");

route.post("/signUp", userControllers.signUp);
route.post("/login", userControllers.login);
route.get("/logOut", userControllers.logOut);
route.get("/", userControllers.someOtherRoute);

route.post("/addTask", authMiddleware.requireAuth, taskControllers.addTask);

module.exports = route;
