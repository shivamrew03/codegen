import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.cookies)
    const token = req.cookies?.token;
    if (!token) {
      // next(error)
      return;
      // throw new UnauthorizedError('Authentication required');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    }
    next(error);
  }
};

export default authMiddleware;