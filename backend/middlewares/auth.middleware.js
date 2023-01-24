import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/index.js";
import AuthRoles from "../utils/authRoles.js";
export const isLoggedIn = async (req, res, next) => {
    let token;

    if(req.cookies.token || 
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        ) {
            token = req.cookies.token || req.headers.authorization.split(" ")[1];
        }

    if(!token) {
        return res.status(403).json({
            success: false,
            message: "You're not allowed to access this page."
        });
    }

    try {
        const decodedToken = JWT.verify(token, config.JWT_SECRET);
        const id = decodedToken._id;
        
        req.user = await User.findById(id)
        next();
    } catch (error) {
        // TODO: handle if token is expired
        
        return res.status(403).json({
            success: false,
            message: "You're not allowed to access this page."
        });
    }
}

export const isAdmin = async (req, res, next) => {
    const user = req.user;

    if(user.role !== AuthRoles.ADMIN) {
        return res.status(403).json({
            success: false,
            message: "You're not authorized to perform this operation!"
        });
    }
    next();
}

export const isAdminOrModerator  = async (req, res, next) => {
    const user = req.user;

    if(user.role === AuthRoles.ADMIN || user.role === AuthRoles.MODERATOR) {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: "You're not authorized to perform this operation!"
    });
}
// TODO: write middleware for authenticating admin, user, guest