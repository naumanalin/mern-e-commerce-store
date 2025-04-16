import express from 'express'
import { isLogedIn } from '../middleware/auth.middleware.js';
import { addToCart, getCartproducts, removeProductFromCart, updateQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', isLogedIn, addToCart)
router.get('/', isLogedIn, getCartproducts)
router.delete('/:id', isLogedIn, removeProductFromCart) // or geting product id in req.body
router.put('/:id', isLogedIn, updateQuantity)

export default router;