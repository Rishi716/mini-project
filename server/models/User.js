import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    default: 'Student',
  },
  stage: {
    type: String,
    default: 'Class 11-12',
    enum: ['Class 6-10', 'Class 11-12', 'Entrance Aspirant', 'College Student', 'Placement Stage'],
  },
  targetDomain: {
    type: String,
    default: 'Computer Science & AI',
  },
  interests: {
    type: [String],
    default: ['Coding', 'Artificial Intelligence', 'Mathematics'],
  },
  parentName: String,
  parentEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
