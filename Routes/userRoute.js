import express from "express";
import userController from "../Controller/userController.js";
const router = express.Router();

router.get("/", userController.getUser);
router.get("/:id", userController.getUserByID);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);


export default router;
