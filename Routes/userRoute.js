import express from "express";
import userController from "../Controller/userController.js";
import verifyUser from "../Middelwares/auth.js";
const router = express.Router();

router.get("/", verifyUser, userController.getUser);
router.get("/:id", verifyUser, userController.getUserByID);
router.post("/", userController.addUser);
router.delete("/:id", verifyUser, userController.deleteUser);
router.put("/:id", verifyUser, userController.updateUser);
router.post("/admin/login", userController.loginUser);
router.post("/admin/logout", userController.logOutUser);
export default router;
