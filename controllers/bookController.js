
const bookModel = require("../models/bookModel")
const { throwError } = require("../utils/throwError")
const { uploadImageHandler } = require("../utils/uploadImage")
const cloudinary = require("../utils/cloudinaryInit")


const addBook = async (req, res) => {

    console.log(req.file)

    const { name, authorName } = req.body

    const existingBook = await bookModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        authorName: { $regex: new RegExp(`^${authorName}$`, 'i') }
    })

    if (existingBook) throwError("Book already Exist!", 400)

    const bookImage = await uploadImageHandler(req.file, "Knowledge_Shelf")

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

const getAllBook = async (req, res) => {

    const allBook = await bookModel.find();

    if (allBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Books List Available."
      });
    }
    
    res.status(200).json({
      success: true,
      books: allBook
    });
    
}

const getSingleBook = async (req, res) => {
    const book = await bookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No Book Found with the given ID."
      });
    }
    
    res.status(200).json({
      success: true,
      book: book
    });
}

const deleteBook = async (req, res) => {


    const book = await bookModel.findByIdAndDelete(req.params.id )

    if (book) {
        if(book.imageKey){
            console.log(book.imageKey)
            const result = await cloudinary.uploader.destroy(book.imageKey)
            console.log(result)
        }
    }else{
        return res.status(200).json({
            msg: "No Book Found"
        })
    }

    return res.status(200).json({
        msg: "Book Deleted"
    })

  }
  

module.exports = { addBook, getAllBook, deleteBook, getSingleBook }