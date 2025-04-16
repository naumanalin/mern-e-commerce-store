import express from "express";
import { isLogedIn } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", isLogedIn, createCheckoutSession);
router.post("/checkout-success", isLogedIn, checkoutSuccess);

export default router;