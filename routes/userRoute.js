const express = require("express")
const router = express.Router() 
const { registerUser, loginUser, refreshToken, updateUser, profile }  =  require("../controllers/userController")
const catchAsync = require("../utils/catchError.js")
const { validateUserLogin, validateUserReg } = require("../validator/authValidator.js")
const checkAuth = require("../middleware/checkAuth.js")
const handleValidationErrors = require("../utils/validationErrorHandler.js")



router.post("/registration",validateUserReg,handleValidationErrors,catchAsync(registerUser))
router.post("/login",validateUserLogin,handleValidationErrors, catchAsync(loginUser))
router.post("/refresh-token", catchAsync(refreshToken))
router.patch("/profile",checkAuth,catchAsync(updateUser))
router.get("/profile",checkAuth,catchAsync(profile))

module.exports = router