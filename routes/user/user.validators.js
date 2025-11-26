import {body} from 'express-validator';

export const signupValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required').bail()
        .isLength({min: 3, max: 50}).withMessage('Username must be 3-50 characters').bail()
        .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required').bail()
        .normalizeEmail()
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .bail()
        .isLength({min: 6}).withMessage('Password must be at least 6 characters')];

export const loginValidator = [
    body('username')
        .optional()
        .trim()
        .notEmpty().withMessage('Username cannot be empty'),

    body('email')
        .optional()
        .trim()
        .notEmpty().withMessage('Email cannot be empty'),

    body().custom((value, {req}) => {
        if (!req.body.username && !req.body.email) {
            throw new Error('Either username or email is required');
        }
        return true;
    }),

    body('password')
        .notEmpty().withMessage('Password is required')
]