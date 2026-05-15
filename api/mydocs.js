const jwt = require('jsonwebtoken');
const Document = require('../Backend/models/Document');
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

    const { year, branch } = req.query;

    // Build filter
    const filter = {};
    if (year) filter.year = Number(year);
    if (branch) filter.branch = branch;

    const docs = await Document.find(filter);
    return res.status(200).json({ success: true, docs });
  } catch (error) {
    console.error('MyDocs error:', error);
    return res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
};
