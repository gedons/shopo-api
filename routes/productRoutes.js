const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new product
router.post('/create', authMiddleware.verifyToken, productController.createProduct);

// Get all products
router.get('/all', productController.getAllProducts);

// Get a single product by ID
router.get('/:productId', productController.getProductById);

// Get products by category
router.get('/product-category/:categoryId', productController.getProductsByCategory);

// Update a product by ID
router.put('/update/:productId', authMiddleware.verifyToken, productController.updateProductById);

// Delete a product by ID
router.delete('/delete/:productId', authMiddleware.verifyToken, productController.deleteProductById);





module.exports = router;