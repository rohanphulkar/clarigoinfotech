const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// retrieve single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

// retrieve all rpoduct
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

// add new producct
const addProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    // Getting the image filename from req.file
    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath);

    // Creating a new product instance with the uploaded image
    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      image: result.secure_url,
      description,
    });

    res.status(201).json({ product });
  } catch (error) {
    console.log(error);
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    const { id } = req.params;
    // Getting the image filename from req.file
    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath);

    // Creating a new product instance with the uploaded image
    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        category,
        price,
        quantity,
        image: result.secure_url,
        description,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: "product has been deleted." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
