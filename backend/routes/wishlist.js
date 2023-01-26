import { Router } from "express";
import { getWishlist, addProductToWishlist, removeProductFromWishlist } from "../controllers/wishlist.controller.js";
import { isLoggedIn, isOwner } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:userId", isLoggedIn, isOwner, getWishlist);

router.post("/:userId/add", isLoggedIn, isOwner, addProductToWishlist);

router.put("/:userId/remove", isLoggedIn, isOwner, removeProductFromWishlist);

export default router;
