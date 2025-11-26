/**
 * Generic error handler middleware
 */
export const errorHandler = (err, _req, res, _next) => {
    console.error("Request error", err);

    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    return res.status(status).json({
        success: false,
        message: message,
        error: err.name || 'Error'
    });
};