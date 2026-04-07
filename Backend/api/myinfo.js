const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// GET /api/mydocs
router.get('/myinfo', async (req, res) => {
  try {
    // 1️⃣ Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided', success: false });
    }

    // 2️⃣ Extract the actual token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, 'secretkey123');

    // 4️⃣ Return user info from token
    res.status(200).json({
      success: true,
      message: 'User info fetched successfully',
      user: decoded
    });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
});

// router.get('/mydocs',(req,res)=>{
//     res.status(200).json({message:"TEsting done "})

// })

module.exports = router;
