import express from 'express'
import { isLogedIn } from '../middleware/auth.middleware.js';
import { getCoupon, validateCoupon } from '../controllers/coupon.controller.js';


const router = express.Router();

router.get("/", isLogedIn, getCoupon);
router.post("/validate", isLogedIn, validateCoupon)
  

export default router;