const express = require("express");
const app = express();
const upload = require("../middleware/multer");

const {
  shopCreate,
  shopList,
  shopDetail,
  shopDelete,
  shopUpdate,
  fetchShop,
  productCreate,
} = require("../controllers/shopsController");
const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else {
    next({
      status: 404,
      message: "shop Not Found",
    });
  }
});

app.use(express.json());

//single : one image onlly
//image: name of the field of the mode

router.post("/", upload.single("image"), shopCreate);

router.get("/", shopList);

router.get("/:shopId", shopDetail);

router.put("/:shopId", upload.single("image"), shopUpdate);

router.delete("/:shopId", shopDelete);

//moved from products routes
router.post("/:shopId/products/", upload.single("image"), productCreate);

module.exports = router;
