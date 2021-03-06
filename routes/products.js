const express = require("express");
const app = express();
const upload = require("../middleware/multer");

const {
  productList,
  productDetail,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productsController");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    next({
      status: 404,
      message: "Product Not Found",
    });
  }
});

app.use(express.json());

//single : one image onlly
//image: name of the field of the mode

// router.post("/", upload.single("image"), productCreate);

router.get("/", productList);

router.get("/:productId", productDetail);

router.put("/:productId", upload.single("image"), productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
