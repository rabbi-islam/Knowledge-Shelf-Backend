
const bookModel = require("../models/bookModel")
const { throwError } = require("../utils/throwError")
const { uploadImageHandler } = require("../utils/uploadImage")


const addBook = async (req, res)=>{

    console.log(req.file)

    const{name,authorName} = req.body

    const existingBook = await bookModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        authorName: { $regex: new RegExp(`^${authorName}$`, 'i') } 
    })

    if(existingBook) throwError("Book already Exist!",400)

    const bookImage = await uploadImageHandler(req.file,"Knowledge_Shelf")

    const newBook = await bookModel.create({
        ...req.body,
        image: bookImage.secure_url,
        imageKey: bookImage.public_id,

   })

    res.status(201).json({
		success: true,
		book: newBook,
	});


}

module.exports = {addBook}