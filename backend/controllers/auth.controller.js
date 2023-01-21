import User from "../models/user.model";
import mailHelper from "../utils/mailHelper";
import crypto from "crypto";
import config from "../config";

const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
}


/******************************************************
 * @SIGNUP
 * @route /api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/
export const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    if(!(name && email && password)) {
        return res.status(400).json({
            message: "Please provide all details"
        });
    }

    // check the user data to DB
    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({
            message: "you already have account with us, do sign in"
        });
    }

    const user = await User.create({
        name, 
        email,
        password,
    });

    const token = user.generateJWT();

    user.password = undefined;
    return res.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        token,
        user
    });
}


/******************************************************
 * @LOGIN
 * @route /api/auth/login
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns token, User Object
 ******************************************************/

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!(email && password)) {
        return res.status(400).json({
            message: "Please fill all details"
        });
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(isPasswordMatched) {
        const token = user.generateJWT();
        user.password = undefined;
        return res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            token,
            user
        });
    }

    return res.status(400).json({
        message: "email or password is wrong!"
    });
};

/******************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/auth/logout
 * @description User logout bby clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/

export const logout = async (req, res) => {
    return res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .status(200)
    .json({
        success: true,
        message: "Log out successful."
    });
}

/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:5000/api/auth/password/forgot
 * @description User will submit email and we will generate a token
 * @parameters  email
 * @returns success message - email send
 ******************************************************/

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({
            message: "Please provide required details"
        });
    }

    const user = await User.findOne({ email: email });

    if(!user) {
        return res.status(400).json({
            message: "User not found!"
        });
    }

    const resetToken = user.generateForgotPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `${config.FRONTEND_DOMAIN}/password/reset/${resetToken}`;

    const text = `Click on the link to reset your password.\n\n${resetURL}\n\n`;

    try {
        await mailHelper({
            email: user.email,
            subject: "Password reset",
            html: text,
        });

        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        
        await user.save({validateBeforeSave: false});

        return res.status(500).json({
            message: "email sending failed"
        });
    }
}

/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:5000/api/auth/password/reset/:resetToken
 * @description User will be able to reset/change password based on url token
 * @parameters  token from url, password and confirmpass
 * @returns User object
 ******************************************************/

export const resetPassword = async (req, res) => {
    const {token: resetToken} = req.params;
    const {password, confirmPassword} = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if(!user) {
        return res.status(400).json({
            message: 'password token is invalid or already expired'
        });
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            message: "Password does not match to confirm password"
        });
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    
    const token = user.generateJWT();
    user.password = undefined;

    return res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        user
    });
}

/******************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:5000/api/auth/profile
 * @description check for token and populate req.user
 * @parameters 
 * @returns User Object
 ******************************************************/

export const getProfile = async (req, res) => {
    const {user} = req;

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        user
    })
};