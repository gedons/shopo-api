const User = require('../models/User');
const bcrypt = require('bcrypt');

// Fetch user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstname, lastname, email, state, country, phone, postcode, address } = req.body;

    const user = await User.findByIdAndUpdate(req.user, { firstname, lastname, email, state, country, phone, postcode, address }, { new: true });
    res.status(200).json({ message: 'User profile updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user profile', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid current password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to change password', error: error.message });
    }
};
  
// Delete user account
exports.deleteUserAccount = async (req, res) => {
try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({ message: 'User account deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Failed to delete user account', error: error.message });
}
};

// View all users (only accessible to admin)
exports.viewAllUsers = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Permission denied. Only admin users can view all users.' });
        }

      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};