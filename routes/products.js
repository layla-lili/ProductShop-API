const express = require("express");
const app = express();

const {
  productCreate,
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

// router.post("/");

// router.get("/");

// router.get("/:productId");

// router.put("/:productId");

// router.delete("/:productId");
////////////////////////////////////////

router.post("/", productCreate);

router.get("/", productList);

router.get("/:productId", productDetail);

router.put("/:productId", productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
