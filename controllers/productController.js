const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Permission denied. Only admin users can create products.' });
    }

    const { title, description, size, color, availability, price, categoryId   } = req.body;
    const images = req.files;

     // Check if the specified category exists
     const category = await Category.findById(categoryId);
     if (!category) {
       return res.status(404).json({ message: 'Category not found' });
     }

      // Store image URLs in an array
    const imageUrls = images.map((image) => {
      return `/uploads/products/${image.filename}`;
    });

    const newProduct = new Product({
      title,
      description,
      images: imageUrls,      
      size,
      color,
      availability,
      price,
      category: categoryId, 
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Product creation failed', error: error.message });
  }
};

// Get all random products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error getting products', error: error.message });
    }
};

// Get all products
exports.getRandomProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().populate('category');

     // Get a random selection of products (let's say 5 random products for this example)
     const numberOfRandomProducts = 8;
     const randomProducts = getRandomProducts(allProducts, numberOfRandomProducts);
 

    res.status(200).json({ randomProducts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch random products: ', error: error.message });
  }
};

// Function to get random products from an array of products
function getRandomProducts(productsArray, count) {
  const shuffledProducts = productsArray.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, count);
}


// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId).populate('category');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Error getting product', error: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.categoryId }).populate('category');
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error getting products by category', error: error.message });
    }
};

// get related products by category
exports.getRelatedProductsByCategory = async (req, res) => {
  try {
    const productId = req.params.productId;

    
    const product = await Product.findById(productId);
    const categoryId = product.category; 

    // Find other products with the same category (excluding the current product)
    const relatedProducts = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    }).limit(5);  
    
    res.status(200).json({ relatedProducts });
  } catch (error) {
    res.status(500).json({ message: 'Error getting related products', error: error.message });
  }
};


// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Permission denied. Only admin users can update products.' });
    }

    const {  title, description,  size, color, availability, price, categoryId } = req.body;

    // Check if the specified category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {  title, description, size, color, availability, price, category: categoryId },
      { new: true }
    ).populate('category');

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Product update failed', error: error.message });
  }
};

// Handle image upload for a specific product by ID
exports.uploadProductImage = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Assuming the image is stored in req.file after Multer processing
    const imagePath = `/uploads/products/${req.file.filename}`;

    // Add the new image path to the product's images array
    product.images.push(imagePath);
    const updatedProduct = await product.save();

    res.status(200).json({ message: 'Image Added successfully', image: updatedProduct });
  } catch (error) {
    console.error('Error uploading product image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};


// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can delete products.' });
      }
  
      const deletedProduct = await Product.findByIdAndDelete(req.params.productId).populate('category');
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }


      // Loop through each image path in the deleted product's images array
      deletedProduct.images.forEach((imagePath) => {
        // Construct the full path to the image file
        const fullImagePath = path.join(__dirname, '..', imagePath);  

        // Check if the file exists and unlink (delete) it from the server
        if (fs.existsSync(fullImagePath)) {
          fs.unlinkSync(fullImagePath);
        }
      });

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Product deletion failed', error: error.message });
    }
};

// Get total number of products
exports.getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch total products', error: error.message });
  }
};