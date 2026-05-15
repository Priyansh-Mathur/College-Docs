const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

const verifyToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, JWT_SECRET);
};

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const authHeader = req.headers.authorization;
    const decoded = verifyToken(authHeader);

    return res.status(200).json({
      success: true,
      message: 'User info fetched successfully',
      user: decoded,
    });
  } catch (error) {
    console.error('MyInfo error:', error);
    return res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
};
