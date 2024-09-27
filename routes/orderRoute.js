const express = require("express")
const catchAsync = require("../utils/catchError.js")
const addOrder = require("../controllers/orderController.js")
const checkAuth = require("../middleware/checkAuth.js")
const router = express.Router() 


router.post("/order/:bookId", checkAuth,catchAsync(addOrder))


module.exports = router
