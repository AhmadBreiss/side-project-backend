import express from "express";
import ProductController from "../Controller/productController.js";
const router = express.Router();

router.get("/", ProductController.getProduct);
router.get("/:id", ProductController.getProductByID);
router.post("/", ProductController.addProduct);
router.delete("/:id", ProductController.deleteProduct);
router.put("/:id", ProductController.updateProduct);


export default router;
