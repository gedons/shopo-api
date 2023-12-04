const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadBanner');

// Create a new banner route
router.post('/create', authMiddleware.verifyToken, upload.array('images'), bannerController.createBanner);

// Update a banner by ID
router.put('/update/:bannerId', authMiddleware.verifyToken, bannerController.updatebannerById);

// Delete a banner by ID
router.delete('/delete/:bannerId', authMiddleware.verifyToken, bannerController.deletebannerById);

// Get all banners
router.get('/all', bannerController.getAllBanners);

  

module.exports = router;