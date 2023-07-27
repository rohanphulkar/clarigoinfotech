// importing required modules and packages
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const fileUpload = require("express-fileupload");

//  middlewares
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connection to mongoDb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// importing routes
const ProductRoutes = require("./routes/productRoutes");
const UserRoutes = require("./routes/userRoutes");
// using routes

app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);

//  starting app
app.listen(PORT, () => {
  console.log(`Server running on port, ${PORT}`);
});
