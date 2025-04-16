import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;

import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponsRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js'


import { connectDB } from './config/connectDB.js';
connectDB();


const app = express();
app.use(express.json({ limit: '5mb' }))  // allows you to parse body of the request object
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))



// All API End Points Routes
app.get('/', (req, res)=>{ res.json({success:true, ok:1, message:"hello from express api backend"}) });
app.use('/api/auth', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/coupon', couponsRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/analytics', analyticsRoutes)


app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});

export default app;