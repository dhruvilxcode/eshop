import { Router } from "express";
import { createCoupon, deactivateCoupon, deleteCoupon, getAllCoupons, getCouponDetails, activateCoupon } from "../controllers/coupon.controller.js";
import { isAdmin, isAdminOrModerator, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isLoggedIn, isAdminOrModerator, getAllCoupons);
router.get("/:code", isLoggedIn, getCouponDetails);

router.post("/create", isLoggedIn, isAdminOrModerator, createCoupon);

router.put("/deactivate/:code", isLoggedIn, isAdminOrModerator, deactivateCoupon);
router.put("/activate/:code", isLoggedIn, isAdminOrModerator, activateCoupon);

router.delete("/delete/:code", isLoggedIn, isAdminOrModerator, deleteCoupon);

export default router;
