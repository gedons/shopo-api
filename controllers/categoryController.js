const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Permission denied. Only admin users can create categories.' });
    }

    const { name } = req.body;

    const newCategory = new Category({
      name,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: savedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Category creation failed', error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: 'Error getting categories', error: error.message });
    }
  };

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
    return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ category });
} catch (error) {
    res.status(500).json({ message: 'Error getting category', error: error.message });
}
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can update categories.' });
      }
  
      const { name } = req.body;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        { name },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Category update failed', error: error.message });
    }
  };

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admin users can delete categories.' });
      }
  
      const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Category deletion failed', error: error.message });
    }
  };