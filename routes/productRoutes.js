const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadProduct');

// Create a new product route
router.post('/create', authMiddleware.verifyToken, upload.array('images'), productController.createProduct);

// Get all products
router.get('/all', productController.getAllProducts);

// Get all random products
router.get('/random', productController.getRandomProducts);

// Get a single product by ID
router.get('/:productId', productController.getProductById);

// Get products by category
router.get('/product-category/:categoryId', productController.getProductsByCategory);

// get related products by category
router.get('/:productId/related', productController.getRelatedProductsByCategory);

// Update a product by ID
router.put('/update/:productId', authMiddleware.verifyToken, productController.updateProductById);

// Handle image upload for a specific product by ID
router.post('/:productId/image', upload.single('image'), productController.uploadProductImage);

// Delete a product by ID
router.delete('/delete/:productId', authMiddleware.verifyToken, productController.deleteProductById);

// Get total number of products
router.get('/getTotalProducts',  authMiddleware.verifyToken, productController.getTotalProducts);


module.exports = router;