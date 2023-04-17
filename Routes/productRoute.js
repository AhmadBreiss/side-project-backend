import express from "express";
import ProductController from "../Controller/productController.js";
import {upload} from "../Middelwares/mediaUpload.js";
const router = express.Router();

router.get("/", ProductController.getProduct);
router.get("/:id", ProductController.getProductByID);
router.post("/", upload, ProductController.addProduct);
router.delete("/:id", ProductController.deleteProduct);
router.patch("/:id",upload, ProductController.updateProduct);

export default router;
