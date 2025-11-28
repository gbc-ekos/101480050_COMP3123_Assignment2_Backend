import User from "../../models/user.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    // Looking for duplicate username or email
    const user = await User.findOne({
        $or: [
            {username: req.body.username},
            {email: req.body.email}
        ]
    });

    if (user) {
        let msg = '';
        if (user.username === req.body.username) {
            msg += 'Username already taken. ';
        }
        if (user.email === req.body.email) {
            msg += 'Email already taken. ';
        }

        const error = new Error(msg.trim());
        error.name = 'ConflictError';
        error.status = 409;
        throw error;
    }

    // Password hashing implemented in schema on pre save
    await User.create(req.body);

    res.status(201).json({
        message: "User created successfully"
    });
}

export const login = async (req, res) => {
    const {username, email, password} = req.body;
    let userByUsername;
    let userByEmail;
    // If username is provided, find user by username
    if (username) {
        userByUsername = await User.findOne({
            username: username
        });
        if (!userByUsername) {
            const error = new Error('User not found');
            error.name = 'AuthenticationError';
            error.status = 404;
            throw error;
        }
    }
    // If email is provided, find user by email
    if (email) {
        userByEmail = await User.findOne({
            email: email
        })
        if (!userByEmail) {
            const error = new Error('User not found');
            error.name = 'AuthenticationError';
            error.status = 404;
            throw error;
        }
    }

    // If user provided both username and email, check if they match
    if (userByUsername && userByEmail && userByUsername._id !== userByEmail._id) {
        const error = new Error('User not found');
        error.name = 'AuthenticationError';
        error.status = 404;
        throw error;
    }

    // At this point, at least one is defined, and if both are defined, they match
    const user = userByUsername ?? userByEmail;
    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) {
        const error = new Error('Invalid password');
        error.name = 'AuthenticationError';
        error.status = 401;
        throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(200).json({
        message: 'Login successful',
        jwt_token: token,
        user
    });
}