// /api/upload.js
const express = require('express');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const verifyToken = require('../middlewares/verifytoken');
const Document = require('../models/Document');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // temporarily store buffer

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'collegeDocsDB';

router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');

    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const uploadStream = bucket.openUploadStream(`${Date.now()}-${req.file.originalname}`, {
      metadata: {
        userId: req.user.id,
        mimetype: req.file.mimetype,
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
      // ✅ FIX: use uploadStream.id and uploadStream.filename manually
      const newDoc = new Document({
        userId: req.user.id,
        branch: req.user.branch,
        year: req.user.year,
        fileId: uploadStream.id,             // <--- FIXED
        fileName: uploadStream.filename,     // <--- FIXED
        filePath: `/api/file/${uploadStream.filename}`,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      });

      await newDoc.save();
      await client.close();

      res.status(200).json({
        success: true,
        message: '✅ File uploaded successfully',
        fileId: uploadStream.id,
        filename: uploadStream.filename,
      });
    });

    uploadStream.on('error', async (err) => {
      await client.close();
      console.error('GridFS Upload Error:', err);
      res.status(500).json({ success: false, error: err.message });
    });

  } catch (err) {
    console.error('❌ Upload Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


// multer → file ko temporarily RAM mein hold karta hai.

// GridFSBucket → MongoDB ke andar file ko chunk-wise likhne ke liye.

// verifyToken → JWT auth middleware; ensures user is logged in.

// Document → mongoose model jisme meta info jaati hai.