import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDatabase from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import aiRoutes from "./src/routes/aiRoutes.js"
import errorHandler from './src/middleware/errorHandler.js';
import logger from './src/middleware/logger.js';

dotenv.config();

const app = express();

// Middleware
app.use(logger);

app.use(cors({ origin: process.env.CLIENT_URL,  credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes)
app.use((req, res, next) => { // If no route matches, throw a NotFoundError
  next(new NotFoundError('Route not found')); 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));