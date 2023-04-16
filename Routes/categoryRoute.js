import express from "express";
import CategoryController from "../Controller/categoryController.js";
const router = express.Router();

router.get("/", CategoryController.getCategory);
router.get("/:id", CategoryController.getCategoryByID);
router.post("/", CategoryController.addCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.put("/:id", CategoryController.updateCategory);


export default router;
