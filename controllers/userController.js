const bcryptjs = require('bcrypt');
const UserModel = require("../models/userModel");
const { throwError } = require("../utils/throwError")
const generateNewTokens = require("../utils/generateNewToken");
const jwt = require("jsonwebtoken");
const handleValidationErrors = require('../utils/validationErrorHandler');




const registerUser = async (req, res, next) => {
    if (handleValidationErrors(req, res)) return;
    const { fullName, email, password } = req.body;
    
    try {
       
        let exits_user = await UserModel.findOne({ email: email }).select('-password');
        
        if (exits_user) {
            return res.json({
                success: false,
                message: "User already exists."
            });
        }
        
        
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        
        const newUser = await UserModel.create({
            fullName, 
            email, 
            password: hashedPassword
        });
      

        
        const userResponse = newUser.toObject();
        delete userResponse.password

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: userResponse
        });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}



const loginUser = async (req, res, next) => {
    if (handleValidationErrors(req, res)) return;
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.findOne({ email: email }).select('+password'); 
        
        if (!user) throwError("User not found", 400)

        
        const isMatch = await bcryptjs.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Wrong Credential."
            });
        }
        
        // Convert the user to an object and remove the password field
        const userResponse = user.toObject();
        delete userResponse.password;

        // Generate tokens
        const tokens = generateNewTokens(user);
        
        return res.json({
            success: true,
            user: userResponse,
            accessToken:tokens.accessToken,
            refreshToken:tokens.refreshToken

        });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const refreshToken = async (req, res) => {
    const { refreshToken } = req.body; 

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Refresh token is required." });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Generate new access and refresh tokens
        const tokens = generateNewTokens(user);

        return res.json({
            success: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        console.error("Error in refreshing token:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ success: false, message: "Refresh token expired." });
        }
        return res.status(403).json({ success: false, message: "Invalid refresh token." });
    }
};

const updateUser = async (req, res, next) => {
    if (handleValidationErrors(req, res)) return;

    const { fullName, email } = req.body;
    const userId = req.user._id; 

    try {
        
        const user = await UserModel.findById(userId);

        if (!user) throwError("User not found", 400)

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;

        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.password;

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { registerUser, loginUser,refreshToken,updateUser };
