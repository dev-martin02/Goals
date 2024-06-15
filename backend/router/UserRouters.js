const app = require("express");
const route = app.Router();
const userControllers = require("../controllers/UserAuthentication");
const taskControllers = require("../controllers/UserTask");
const authMiddleware = require("../middleware/authMiddleware");

// User authentication routers
route.post("/signUp", userControllers.signUp);
route.post("/login", userControllers.login);
route.get("/logOut", userControllers.logOut);

// User Tasks routers
route.post("/addTask", authMiddleware.requireAuth, taskControllers.addTask);
route.put("/update", authMiddleware.requireAuth, taskControllers.updateTask);
route.delete("/delete", authMiddleware.requireAuth, taskControllers.deleteTask);
route.get("/", authMiddleware.requireAuth, taskControllers.getUserTask);

module.exports = route;
