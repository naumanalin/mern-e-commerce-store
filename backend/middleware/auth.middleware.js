import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const isLogedIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : null);
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        try {
            const decode = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findById(decode.userId).select("-password"); 
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;  
            next();  
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Token expired" });
            }
            throw error;
        }
    } catch (error) {
        console.log(`❌ Error in isLoggedIn middleware: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


export const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();  
        } else {
            return res.status(403).json({ success: false, message: "Access denied, only Admin can access" });
        }
    } catch (error) {
        console.log(`❌ Error in isAdmin middleware: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
