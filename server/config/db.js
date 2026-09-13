import mongoose from 'mongoose';

let mongoConnected = false;

export const isMongoConnected = () => mongoConnected;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('replace_this')) {
    console.log('⚠️  No MongoDB URI configured — using JSON file storage in server/data/.');
    mongoConnected = false;
    return;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    mongoConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    mongoConnected = false;
    console.warn(`⚠️  MongoDB unavailable (${err.message}). Falling back to JSON file storage in server/data/.`);
  }
};