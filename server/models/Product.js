const mongoose = require("mongoose");
var slugify = require("slugify");

// defining user model schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
});

// hashing password before saving it to database
productSchema.pre("save", async function (next) {
  const slug = await slugify(this.name);
  this.slug = await slug;
});

// exporting the user schema
module.exports = mongoose.model("Product", productSchema);
