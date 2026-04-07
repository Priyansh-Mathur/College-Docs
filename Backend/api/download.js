// /api/file.js
const express = require('express');
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

const router = express.Router();

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'collegeDocsDB';

// ✅ DOWNLOAD ROUTE
router.get('/download/:id', async (req, res) => {
  const fileId = req.params.id;
  console.log(fileId)

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // open download stream
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    // ✅ Optional: fetch file info (so we can send correct headers)
    const fileDoc = await db.collection('uploads.files').findOne({ _id: new ObjectId(fileId) });
    if (!fileDoc) {
      await client.close();
      return res.status(404).json({ error: 'File not found' });
    }

    // set headers for download
    res.set({
      'Content-Type': fileDoc.metadata?.mimetype || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileDoc.filename}"`,
    });

    // stream file data to client
    downloadStream.pipe(res);

    downloadStream.on('error', async (err) => {
      console.error('GridFS Download Error:', err);
      await client.close();
      res.status(404).json({ error: 'Error reading file' });
    });

    downloadStream.on('end', async () => {
      await client.close();
    });

  } catch (err) {
    console.error('❌ Download Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
