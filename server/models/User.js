const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// defining user model schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

// hashing password before saving it to database

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// exporting the user schema
module.exports = mongoose.model("User", userSchema);
