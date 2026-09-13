import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  isCompleted: { type: Boolean, default: false },
});

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  tasks: {
    type: [taskSchema],
    default: [
      { id: 1, title: 'Solve 10 Practice Questions on Binary Search Trees', category: 'Lesson', isCompleted: true },
      { id: 2, title: 'Revise Physics Weightage Topics for JEE / CUET', category: 'Revision', isCompleted: false },
      { id: 3, title: 'Take 5-Min Career Aptitude Quiz', category: 'Quiz', isCompleted: false },
      { id: 4, title: 'Review ATS Resume Keywords for Software Engineer Role', category: 'Project', isCompleted: false },
    ],
  },
  quizScores: [
    {
      score: Number,
      total: Number,
      domain: String,
      date: { type: Date, default: Date.now },
    },
  ],
  atsScores: [
    {
      score: Number,
      domain: String,
      fileName: String,
      date: { type: Date, default: Date.now },
    },
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export const Progress = mongoose.model('Progress', progressSchema);
