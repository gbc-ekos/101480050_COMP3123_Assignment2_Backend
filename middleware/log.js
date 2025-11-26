/**
 * Logger middleware - logs all incoming requests
 */
export const loggerMiddleware = async (req, res, next) => {
    try {
        console.log('Request', req.method, req.originalUrl);
        next();
    } catch (e) {
        next(e);
    }
};