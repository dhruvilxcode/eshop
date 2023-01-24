import { Router } from "express";
import { createCollection, deleteCollection, getAllCollection, updateCollection } from "../controllers/collection.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllCollection);

router.post("/create", isLoggedIn, isAdmin, createCollection);

router.put("/update/:id", isLoggedIn, isAdmin, updateCollection);

router.delete("/delete/:id", isLoggedIn, isAdmin, deleteCollection);

export default router;
