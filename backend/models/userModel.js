const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please include a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please include an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please include a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
