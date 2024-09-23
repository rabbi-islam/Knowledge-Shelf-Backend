const express = require("express")
const { addBook } = require("../controllers/bookController")
const upload = require("../middleware/upload")
const catchAsync = require("../utils/catchError")
const router = express.Router() 

router.post("/book",upload.single("image") ,catchAsync(addBook))

module.exports = router