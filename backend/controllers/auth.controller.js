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