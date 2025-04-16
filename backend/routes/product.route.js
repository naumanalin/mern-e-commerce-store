import express from 'express'
import { isAdmin, isLogedIn } from '../middleware/auth.middleware.js';
import { createNewProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProcuts, toggleFeaturedProductStatus } from '../controllers/product.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/', upload.single('image'), isLogedIn, isAdmin, createNewProduct)
router.get('/', isLogedIn, isAdmin, getAllProducts)
router.delete('/:id', isLogedIn, isAdmin, deleteProduct)
router.patch('/:id', isLogedIn, isAdmin, toggleFeaturedProductStatus) // we can use 'put' http method but patch used to update couple of fields and put used to update intir document

router.get('/featured', getFeaturedProducts) // store in redis because this featured products access by every one
router.get('/category/:category', getProductsByCategory)
router.get('/recommended-products', isLogedIn, getRecommendedProcuts )

export default router;


