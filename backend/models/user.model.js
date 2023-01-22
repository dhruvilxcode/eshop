import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        maxLength: [50, "name must be less than 50 characters"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String, 
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 character']
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
}, {timestamps: true});

userSchema.pre("pre", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods = {
    comparePassword: async function (pwd) {
        return await bcryptjs.compare(pwd, this.password);
    },
    generateJWT: function () {
        return JWT.sign({
            _id: this._id,
            role: this.role
        }, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY});
    },
    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString('hex');

        // 1. encrypt the token and save to db
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        // 2. set the token expiry
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000 // expiry: 20 mins

        return forgotToken
    },
}

export default mongoose.model("User", userSchema);