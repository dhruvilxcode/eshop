import { Router } from "express";
import { login, logout, forgotPassword, signUp, getProfile, resetPassword } from "../controllers/auth.controller";

const router = Router();


router.post("/login", login);

router.post("/signup", signUp);

router.get("/logout", logout);

router.get("/profile", getProfile);

router.post("/password/forgot", forgotPassword);

router.post("/password/reset/:token", resetPassword);

export default router;