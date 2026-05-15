const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Backend/models/User');
const connectDb = require('./_db');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectDb();
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found ❌', success: false });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials ❌', success: false });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        year: user.year,
        branch: user.branch,
        scholar_id: user.scholar_id,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    return res.status(200).json({
      message: 'Login successful 🚀',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch: user.branch,
        year: user.year,
        scholar_id: user.scholar_id,
      },
      success: true,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error 💀', success: false });
  }
};
