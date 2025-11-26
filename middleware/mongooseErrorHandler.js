import mongoose from 'mongoose';

/**
 * Mongoose error handler
 */
export const mongooseErrorHandler = (err, _req, res, next) => {
    // Check if it's a Mongoose or MongoDB error
    if (err instanceof mongoose.Error || err instanceof mongoose.mongo.MongoError) {
        return res.status(400).json({
            success: false,
            message: err.message || 'Database error',
            error: err.name || 'MongoError'
        });
    }

    next(err);
};