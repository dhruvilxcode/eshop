import { Router } from "express";
import { addProduct, deleteProduct, deleteProductImage, getAllProducts, getProduct, updateProductAdvancedDetails, updateProductBasicDetails, updateProductImages, updateProductSizes } from "../controllers/product.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProduct);

router.post("/create", isLoggedIn, isAdmin, addProduct);

router.post("/:productId/update/basic_details", isLoggedIn, isAdmin, updateProductBasicDetails);
router.post("/:productId/update/advance_details", isLoggedIn, isAdmin, updateProductAdvancedDetails);
router.post("/:productId/update/images", isLoggedIn, isAdmin, updateProductImages);
router.post("/:productId/update/sizes", isLoggedIn, isAdmin, updateProductSizes);
router.post("/:productId/delete/image", isLoggedIn, isAdmin, deleteProductImage);

router.delete("/:productId/delete", isLoggedIn, isAdmin, deleteProduct);

export default router;
