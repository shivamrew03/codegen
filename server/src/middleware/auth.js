import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

const authMiddleware = (req, res, next) => {
  // console.log(req.cookies);
  
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export default authMiddleware;