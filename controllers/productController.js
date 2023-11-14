const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Permission denied. Only admin users can create products.' });
    }

    const { title, description, imageUrl, size, color, price, categoryId   } = req.body;

     // Check if the specified category exists
     const category = await Category.findById(categoryId);
     if (!category) {
       return res.status(404).json({ message: 'Category not found' });
     }

    const newProduct = new Product({
      title,
      description,
      imageUrl,
      size,
      color,
      price,
      category: categoryId,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Product creation failed', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error getting products', error: error.message });
    }
};


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

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can update products.' });
      }
  
      const {  title, description, imageUrl, size, color, price, categoryId } = req.body;
  
      // Check if the specified category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        {  title, description, imageUrl, size, color, price, category: categoryId },
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
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Product deletion failed', error: error.message });
    }
};