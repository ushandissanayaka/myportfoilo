import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true, // Email should be unique
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
    },
    aboutMe: {
        type: String,
        required: [true, "About Me field is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false, // Prevent password from being returned in queries by default
    },
    avatar: {
        public_id: {
            type: String,
            required: [true, "Avatar public_id is required!"],
        },
        url: {
            type: String,
            required: [true, "Avatar URL is required!"],
        },
    },
    resume: {
        public_id: String, // Made optional
        url: String, // Made optional
    },
    portfolioURL: {
        type: String,
        required: [true, "Portfolio URL is required!"],
    },
    githubURL: String,
    linkedInURL: String,
    facebookURL: String,
    mediumURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Hash password before saving user to the database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JSON Web Token (JWT) for authentication
userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token expiration time (15 minutes)
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

export const UserModel = mongoose.model("User", userSchema);
