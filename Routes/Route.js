import express from "express";
import ProductController from "../Controller/ProductController.js";
const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.GetByID);
router.post("/", ProductController.Add);
router.delete("/:id", ProductController.Delete);
router.put("/:id", ProductController.Update);


export default router;
