const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

let cachedConnection = null;
let connectionPromise = null;

module.exports = async function connectDb() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set in environment variables');
  }

  connectionPromise = mongoose.connect(MONGO_URI).then((conn) => {
    cachedConnection = conn;
    return conn;
  }).catch((err) => {
    connectionPromise = null;
    throw err;
  });

  return connectionPromise;
};
