const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");
const useController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

//user routes
router.post("/user/signup", useController.userSignup);
router.post("/user/login", useController.userLogin);
router.post("/admin/login", useController.adminLogin);
router.get("/getuser", authMiddleware, useController.getuser);

//car routes
router.post("/create", authMiddleware, carController.createCar);
router.get("/getcar", authMiddleware, carController.getCars);
router.put("/getcar:id", authMiddleware, carController.updateCar);
router.delete("/deletecar/:id", authMiddleware, carController.deleteCar);

module.exports = router;
