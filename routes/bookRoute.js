const express = require("express")
const { addBook, getAllBook, deleteBook, getSingleBook } = require("../controllers/bookController")
const upload = require("../middleware/upload")
const catchAsync = require("../utils/catchError.js")
const router = express.Router() 

router.post("/book",upload.single("image") ,catchAsync(addBook))
router.get("/book", catchAsync(getAllBook))
router.get("/book/:id", catchAsync(getSingleBook))
router.delete("/book/:id", catchAsync(deleteBook))

module.exports = router