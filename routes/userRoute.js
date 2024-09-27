const { registerUser, loginUser, refreshToken, updateUser }  =  require("../controllers/userController")

const express = require("express")
const catchAsync = require("../utils/catchError.js")
const { validateUserLogin, validateUserReg } = require("../validator/authValidator.js")
const checkAuth = require("../middleware/checkAuth")
const router = express.Router() 


router.post("/registration",validateUserReg,catchAsync(registerUser))
router.post("/login",validateUserLogin,catchAsync(loginUser))
router.post("/refresh-token",catchAsync(refreshToken))
router.patch("/profile",checkAuth,catchAsync(updateUser))

module.exports = router