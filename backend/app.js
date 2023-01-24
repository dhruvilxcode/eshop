import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import config from "./config/index.js";

// route imports
import AuthRoutes from "./routes/auth.js";
import CollectionRoutes from "./routes/collection.js";
import CouponRoutes from "./routes/coupon.js";
// route imports

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: config.FRONTEND_DOMAIN }));
app.use(morgan("tiny"));
// middlewares

// routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/collections", CollectionRoutes);
app.use("/api/v1/coupons", CouponRoutes);
// routes

app.get("/", (req, res) => {
  res.send("Welcome.");
});

export default app;
