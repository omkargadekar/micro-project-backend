const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "UserName is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    age: {
      type: Number,
      require: [true, "age is required"],
    },
    gender: {
      type: String,
      require: [true, "gender is required"],
    },
    mobile: {
      type: Number,
      require: [true, "mobile is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
