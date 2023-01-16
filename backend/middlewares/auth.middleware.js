import JWT from "jsonwebtoken";
import User from "../models/user.model";
import config from "../config/index";

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

        //TODO: fix me
        req.user = await User.findById(id)
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "You're not allowed to access this page."
        });
    }
}


// TODO: write middleware for authenticating admin, user, guest