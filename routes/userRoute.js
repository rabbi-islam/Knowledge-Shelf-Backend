const express = require("express")
const router = express.Router() 
const { registerUser, loginUser, refreshToken, updateUser }  =  require("../controllers/userController")
const catchAsync = require("../utils/catchError.js")
const { validateUserLogin, validateUserReg } = require("../validator/authValidator.js")
const checkAuth = require("../middleware/checkAuth.js")



router.post("/registration",validateUserReg,catchAsync(registerUser))
router.post("/login",validateUserLogin,catchAsync(loginUser))
router.post("/refresh-token", checkAuth, catchAsync(refreshToken))
router.patch("/profile",checkAuth,catchAsync(updateUser))

module.exports = router