const Banner = require('../models/Banner');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Create a new banner
exports.createBanner = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can create banner.' });
      }
  
      const { header, paragraph   } = req.body;
      const images = req.files;
        
  
        // Store image URLs in an array
      const imageUrls = images.map((image) => {
        return `/uploads/banners/${image.filename}`;
      });
  
      const newBanner = new Banner({
        header,
        paragraph,
        images: imageUrls,             
      });
  
      const savedBanner = await newBanner.save();
  
      res.status(201).json({ message: 'Banner created successfully', banner: savedBanner });
    } catch (error) {
      res.status(500).json({ message: 'Banner creation failed', error: error.message });
    }
};

// Update a banner by ID
exports.updatebannerById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can update banner.' });
      }
  
      const { header, paragraph   } = req.body;

     
      const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.bannerId,
        {   header, paragraph },
        { new: true }
      );
  
      if (!updatedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      res.status(200).json({ message: 'Banner updated successfully', product: updatedBanner });
    } catch (error) {
      res.status(500).json({ message: 'Banner update failed', error: error.message });
    }
};


// Delete a banner by ID
exports.deletebannerById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can delete banner.' });
      }
  
      const deletedBanner = await Banner.findByIdAndDelete(req.params.bannerId);
  
      if (!deletedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }


      // Loop through each image path in the deleted product's images array
      deletedBanner.images.forEach((imagePath) => {
        // Construct the full path to the image file
        const fullImagePath = path.join(__dirname, '..', imagePath);  

        // Check if the file exists and unlink (delete) it from the server
        if (fs.existsSync(fullImagePath)) {
          fs.unlinkSync(fullImagePath);
        }
      });

      res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Banner deletion failed', error: error.message });
    }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
    try {
      const banners = await Banner.find();
      res.status(200).json({ banners });
    } catch (error) {
      res.status(500).json({ message: 'Error getting banners', error: error.message });
    }
};
  
