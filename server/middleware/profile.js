import { User } from '../models/User.js';

export const loadProfileMiddleware = async (req, res, next) => {
  if (!req.userId) return next();
  try {
    const user = await User.findById(req.userId);
    if (user) {
      req.profile = {
        name: user.name,
        stage: user.stage,
        targetDomain: user.targetDomain,
        interests: user.interests,
        parentName: user.parentName,
        parentEmail: user.parentEmail,
      };
    }
    next();
  } catch (err) {
    next();
  }
};