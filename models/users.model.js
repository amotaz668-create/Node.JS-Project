const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRole");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: String
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: 'uploads/profile.png'
  },
});


module.exports = mongoose.model("User", userSchema);
