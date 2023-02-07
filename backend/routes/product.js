import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct, updateProductAdvancedDetails, updateProductAsFeatured, updateProductBasicDetails } from "../controllers/product.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProduct);

router.post("/create", isLoggedIn, isAdmin, addProduct);

router.put("/:productId/update", isLoggedIn, isAdmin, updateProduct);

router.post("/:productId/update/basic_details", isLoggedIn, isAdmin, updateProductBasicDetails);
router.post("/:productId/update/advance_details", isLoggedIn, isAdmin, updateProductAdvancedDetails);
router.post("/:productId/update/feature", isLoggedIn, isAdmin, updateProductAsFeatured);

router.delete("/:productId/delete", isLoggedIn, isAdmin, deleteProduct);

export default router;
