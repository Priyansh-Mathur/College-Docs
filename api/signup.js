const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Backend/models/User');
const connectDb = require('./_db');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectDb();
    const { name, email, password, year, scholar_id, branch } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "user already exists", success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      scholar_id,
      branch,
      year,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        year: newUser.year,
        branch: newUser.branch,
        scholar_id: newUser.scholar_id,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: "sign up successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        scholar_id: newUser.scholar_id,
        branch: newUser.branch,
        year: newUser.year,
      },
      success: true,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(400).json({ message: "SERVER ERROR", success: false });
  }
};
