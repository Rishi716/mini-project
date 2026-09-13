import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  sender: {
    type: String,
    enum: ['user', 'ai'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  isWarning: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const safetyReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  studentName: String,
  parentName: String,
  parentEmail: String,
  flaggedWords: [String],
  originalMessage: String,
  timestamp: String,
  status: {
    type: String,
    default: 'sent',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
export const SafetyReport = mongoose.model('SafetyReport', safetyReportSchema);
