import User from "../models/user.model";
import mailHelper from "../utils/mailHelper";
import crypto from "crypto";

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

