const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/add", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
