import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProduct);

router.post("/create", isLoggedIn, isAdmin, addProduct);

router.put("/:productId/update", isLoggedIn, isAdmin, updateProduct);

router.delete("/:productId/delete", isLoggedIn, isAdmin, deleteProduct);

export default router;
