import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Authentication middleware
 */
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('No token provided');
            error.name = 'AuthenticationError';
            error.status = 401;
            return next(error);
        }

        const token = authHeader.substring(7); // Remove "Bearer " prefix

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            const error = new Error('User not found');
            error.name = 'AuthenticationError';
            error.status = 401;
            return next(error);
        }

        // Attach full user document to request
        req.user = user;

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            const error = new Error('Invalid token');
            error.name = 'AuthenticationError';
            error.status = 401;
            return next(error);
        }

        if (err.name === 'TokenExpiredError') {
            const error = new Error('Token expired');
            error.name = 'AuthenticationError';
            error.status = 401;
            return next(error);
        }

        next(err);
    }
};
