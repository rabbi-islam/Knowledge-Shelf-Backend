const { model, Schema, models } = require("mongoose");

const orderSchema = new Schema(
    {
        orderName: {
        type: String,
        required: true,
      },

      bookId:{
        type:Schema.Types.ObjectId,
        ref: "Book",
        required:true
      },

      orderBy:{
        type:Schema.Types.ObjectId,
        ref: "Registered_User",
        required:true
      },

  
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
  
      total: {
        type: Number,
        required: true,
      },
      
      phoneNumber: {
        type: String,
        required: true,
      },
  
      address: {
        type: String,
        required: true,
      },
      tranxId: {
        type: String,
        required: true
    }
    },
    {
      timestamps: true,
    }
  );
  
  // Check if the model already exists (models.Book) or create a new one
  const Order = models.Order || model("Order", orderSchema);
  
  module.exports = Order;
  