const { model, Schema, models } = require("mongoose");
const { generateRandomAvatar } = require("../utils/RandomAvatar.js");

const registrationSchema = new Schema(
    {
        fullName: {
        type: String,
        required: true,
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true
      },
      
      password: {
        type: String,
        required: true,
        select:false
      },
      avatar: {
        type: String,
        default: generateRandomAvatar
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
    },
    {
      timestamps: true,
    }
  );
  
  // Check if the model already exists (models.Book) or create a new one
  const User = models.Registered_User || model("Registered_User", registrationSchema);
  
  module.exports = User
  