import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { redis } from '../lib/redis.js';

// -------------------------------------- Helper Functions -----------------------------------------------------------------------
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: "7d" });  // Single token now
    return token;
};

const storeToken = async (userId, token) => {
    await redis.set(`token:${userId}`, token, "EX", 7 * 24 * 60 * 60 * 1000);  
};

const setCookies = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,  // Prevent XSS attacks, not accessible by JavaScript
        secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
};

// -------------------------------------- Controller Functions -----------------------------------------------------------------------

// Sign Up function ------------------------------------------------------------------------------------------------
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ success: false, message: 'Email already exists, you can login' });
        }

        const user = await User.create({ name, email, password });

        const token = generateToken(user._id);
        await storeToken(user._id, token);  // Store the token in Redis (Optional)

        setCookies(res, token);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.log(`❌ Error in signUp controller: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login function ------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        if (findUser && (await findUser.comparePassword(password))) {
            const token = generateToken(findUser._id);
            await storeToken(findUser._id, token);  // Store token in Redis (Optional)
            setCookies(res, token);
            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    _id: findUser._id,
                    name: findUser.name,
                    email: findUser.email,
                    role: findUser.role
                }
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(`❌ Error in login controller: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout function ------------------------------------------------------------------------------------------------
export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const decode = jwt.verify(token, process.env.TOKEN_SECRET);
            await redis.del(`token:${decode.userId}`);  // Optional, remove token from Redis
        }

        res.clearCookie("token"); 
        res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        console.log(`❌ Error in logout controller: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Profile function ------------------------------------------------------------------------------------------------
export const getProfile = async (req, res) => {
    try {
        res.json(req.user);  
    } catch (error) {
        console.log(`❌ Error in getProfile controller: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Recreate Access Token (Optional, only needed for token expiration logic)
export const recreateToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);  // Decode the token
        const newToken = generateToken(decoded.userId);  // Generate a new token

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,  // New token with 15 minutes expiration
        });

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: newToken
        });

    } catch (error) {
        console.log(`❌ Error in recreateToken: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
