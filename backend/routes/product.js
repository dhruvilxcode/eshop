import { Router } from "express";
import { addProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProduct);

router.post("/create", isLoggedIn, isAdmin, addProduct);

router.put("/:productId/update", isLoggedIn, isAdmin, updateProduct);

// router.delete("/delete/:id", isLoggedIn, isAdmin, deleteCollection); //TODO:

export default router;