const { model, Schema, models } = require("mongoose");

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      min: 1,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },
    
    stock: {
      type: Number,
      min: 1,
      required: true,
    },

    description: {
      type: String,
    },
    
    // Corrected the 'image' field configuration
    image: {
        type: String,
        required: true
    },
    imageKey: {
      type: String,
      required: true
  },

    publishedDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists (models.Book) or create a new one
const Book = models.Book || model("Book", bookSchema);

module.exports = Book;
