import { Router } from "express";
import { createPaymentIntent, saveOrderDetails } from "../controllers/order.controller.js";


const router = Router();

router.post("/paymentintent", createPaymentIntent);
router.post("/save", saveOrderDetails);

export default router;
