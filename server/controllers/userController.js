const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`); // Debugging line

    // 1. Find user and check if DB connection is active
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Error: User not found in database.");
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Status check
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account inactive.' });
    }

    // 3. Password Check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Error: Hash mismatch for password.");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Token Generation (Switched 'type' to 'role' to match your Compass)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET || 'fallback_secret', // Fallback if .env fails
      { expiresIn: '1h' }
    );

    // 5. Response (Included role/type parity)
    res.json({ 
      message: 'Login successful', 
      token, 
      role: user.role, // Changed from type to role
      firstName: user.firstName, 
      lastName: user.lastName 
    });
    
    console.log("Login successful for:", email);
  } catch (error) {
    console.error("Login Controller Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };