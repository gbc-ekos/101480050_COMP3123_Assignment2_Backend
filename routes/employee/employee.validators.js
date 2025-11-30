import {body, param, query} from "express-validator";
import {isValidPicture, isPictureSizeValid} from "../../middleware/pictureHandler.js";

export const createValidator = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required').bail()
        .isLength({max: 100}).withMessage('First name must be up to 100 characters').bail()
        .isAlpha().withMessage('First name must contain only letters'),

    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required').bail()
        .isLength({max: 100}).withMessage('Last name must be up to 100 characters').bail()
        .isAlpha().withMessage('Last name must contain only letters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required').bail()
        .normalizeEmail()
        .isEmail().withMessage('Invalid email address'),

    body('position')
        .trim()
        .notEmpty().withMessage('Position is required').bail()
        .isLength({max: 100}).withMessage('Position must be up to 100 characters'),

    body('salary')
        .notEmpty().withMessage('Salary is required').bail()
        .isFloat({min: 0.01}).withMessage('Salary must be a positive number'),

    body('date_of_joining')
        .optional()
        .isISO8601().withMessage('Invalid date format'),

    body('department')
        .trim()
        .notEmpty().withMessage('Department is required').bail()
        .isLength({max: 100}).withMessage('Department must be up to 100 characters'),

    body('picture')
        .optional()
        .custom(isValidPicture).withMessage('Picture must be a valid base64 encoded image (data:image/...)').bail()
        .custom(isPictureSizeValid).withMessage('Picture must be no larger than 5 MB when encoded')
]

export const updateValidator = [
    body('first_name')
        .optional()
        .trim()
        .isLength({max: 100}).withMessage('First name must be up to 100 characters').bail()
        .isAlpha().withMessage('First name must contain only letters'),

    body('last_name')
        .optional()
        .trim()
        .isLength({max: 100}).withMessage('Last name must be up to 100 characters').bail()
        .isAlpha().withMessage('Last name must contain only letters'),

    body('email')
        .optional()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Invalid email address'),

    body('position')
        .optional()
        .trim()
        .isLength({max: 100}).withMessage('Position must be up to 100 characters'),

    body('salary')
        .optional()
        .isFloat({min: 0.01}).withMessage('Salary must be a positive number'),

    body('date_of_joining')
        .optional()
        .isISO8601().withMessage('Invalid date format'),

    body('department')
        .optional()
        .trim()
        .isLength({max: 100}).withMessage('Department must be up to 100 characters'),

    body('picture')
        .optional()
        .custom(isValidPicture).withMessage('Picture must be a valid base64 encoded image (data:image/...)').bail()
        .custom(isPictureSizeValid).withMessage('Picture must be no larger than 5 MB when encoded')
]

export const idValidator = [
    param('id')
        .isMongoId().withMessage('Invalid employee ID format')
]

export const deleteValidator = [
    query('eid')
        .notEmpty().withMessage('Employee ID (eid) is required').bail()
        .isMongoId().withMessage('Invalid employee ID format')
]

export const searchValidator = [
    query('query')
        .optional()
        .trim()
        .isLength({min: 1, max: 100}).withMessage('Search query must be between 1 and 100 characters')
]