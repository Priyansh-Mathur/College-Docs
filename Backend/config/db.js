const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/collegeDocsDB');
    console.log('✅ Main MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error: ', err);
    console.error('tension na le ladle server chal jayega');
    process.exit(1);
  }
};

module.exports = mongoDB;
