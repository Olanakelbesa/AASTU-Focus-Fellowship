import  jwt  from "jsonwebtoken";
import config from "../config/environment.js";

export const generateToken = (userId, role) => {
    try {
        const payload = {
            userId,
            role,
            iat: Math.floor(Date.now() / 1000),
        };
        return jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN
        });
    } catch (error) {
        throw new Error('Error generating JWT token');
    }
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        return decoded;
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            throw new Error('Token has expired')
        } else if(error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token')
        } else {
            throw new Error('Token verification failed');
        }

    }
}

export const generateRefreshToken = (userId) => {
    try {
        return jwt.sign({userId}, config.JWT_SECRET, {
            expiresIn: '30d',
        })
    } catch (error) {
        throw new Error('Error generating refresh token');
    }
}