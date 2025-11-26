/**
 * Not found middleware - handles 404 errors
 */
export const notFoundHandler = (req, res, _) => {
    console.error("Not found: " + req.originalUrl);
    return res.status(404).json({
        success: false,
        message: "Not found",
        error: "NotFoundError"
    });
};