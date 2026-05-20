import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmaill.js";
import crypto from "crypto"


export const register = catchAsyncErrors(async (req, res, next) => {
    // Log the entire req.files object for debugging
    console.log("FILES RECEIVED:", req.files);

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("No files were uploaded!", 400));
    }

    try {
        // Normalize file field names (trim spaces)
        const files = {};
        Object.keys(req.files).forEach((key) => {
            files[key.trim()] = req.files[key];
        });

        // Destructure normalized files
        const { avatar, resume } = files;

        if (!avatar) {
            return next(new ErrorHandler("Avatar file is required!", 400));
        }

        // Upload avatar to Cloudinary
        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: "AVATARS" }
        );

        if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
            console.error("Cloudinary Error:", cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload avatar!", 500));
        }

        // Initialize cloudinaryResponseForResume as null
        let cloudinaryResponseForResume = null;

        if (resume) {
            // Upload resume to Cloudinary
            cloudinaryResponseForResume = await cloudinary.uploader.upload(
                resume.tempFilePath,
                { folder: "MY_RESUME" }
            );

            if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
                console.error("Cloudinary Error:", cloudinaryResponseForResume.error || "Unknown Cloudinary Error");
                return next(new ErrorHandler("Failed to upload resume!", 500));
            }
        }

        // Destructure fields from request body
        const {
            fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            linkedInURL,
            facebookURL,
            mediumURL,
        } = req.body;

        // Ensure required fields are provided
        if (!fullName || !email || !password) {
            return next(new ErrorHandler("Missing required fields: fullName, email, or password", 400));
        }

        // Create new user document
        const user = await UserModel.create({
            fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            linkedInURL,
            facebookURL,
            mediumURL,
            avatar: {
                public_id: cloudinaryResponseForAvatar.public_id,
                url: cloudinaryResponseForAvatar.secure_url,
            },
            resume: cloudinaryResponseForResume
                ? {
                    public_id: cloudinaryResponseForResume.public_id,
                    url: cloudinaryResponseForResume.secure_url,
                }
                : null,
        });

        // Respond with success message
        generateToken(user, "User registered!", 201, res);
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email And Password are required!"));
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or password!"));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email or password!"));
    }
    generateToken(user, "Logged In", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,

    }).json({
        success: true,
        message: "Logged out",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })

})

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        linkedInURL: req.body.linkedInURL,
        facebookURL: req.body.facebookURL,
        mediumURL: req.body.mediumURL,
    }
    if (req.files && req.files.avatar) {
        const avatar = req.files.avatar;
        const user = await UserModel.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);

        // Upload resume to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: "AVATARS" }
        )
        newUserData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,

        }

    }
    if (req.files && req.files.resume) {
        const resume = req.files.resume;
        const user = await UserModel.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);

        // Upload resume to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "MY_RESUME" }
        )
        newUserData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,

        }

    }
    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });
    res.status(200).json({
        success: true,
        message: "profile updated",
        user,
    });
});

export const updaetPassword = catchAsyncErrors(async (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return next(new ErrorHandler("please fill all fields.", 400));
    }
    const user = await UserModel.findById(req.user.id).select("+password");
    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Incorrect current password", 400));
    }
    if (newPassword !== confirmNewPassword) {
        return next(new ErrorHandler("New password and confirm password do not match !", 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "password Updated",
    });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
    const id = "66dae246f21521532dc676b0";
    const user = await UserModel.findById(id);
    res.status(200).json({
        success: true,
        user,
    });

});

export const forgotPassword = catchAsyncErrors(async (req, res, index) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("user not found!", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
    const message = `Your reset passsword token is:- \n\n ${resetPasswordUrl} \n\n If you've not request for this please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "personal portfolio dashboard recovery password",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!`,
        });

    } catch (error) {
        user.resetPasswordExpire = undefined,
            user.resetPasswordToken = undefined,
            await user.save();
        return next(new ErrorHandler(error.message, 500));

    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;

    try {
        // Hash the token received in params
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with matching reset token and check if it's not expired
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        // If no user found or token expired
        if (!user) {
            return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
        }

        // Check if passwords match
        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password and confirm password do not match", 400));
        }

        // Update user password and clear reset token and expiration
        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        // Save the updated user
        await user.save();

        // Generate a new token and send the response
        generateToken(user, "Password reset successfully!", 200, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
