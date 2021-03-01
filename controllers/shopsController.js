const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://localhost:8000/media/${req.file.filename}`;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const _shops = await Shop.findAll({
      attributes: req.body,
      include: {
        model: Product,
        as: "products",
        // attributes: ["id", "name"],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.json(_shops);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res, next) => {
  res.json(req.shop);
};

exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://localhost:8000/media/${req.file.filename}`;
    }
    req.body.id = await req.shop.update(req.body);
    res.status(200).json(req.shop);
  } catch (error) {
    next(error);
  }
};

//Moved from productController
exports.productCreate = async (req, res, next) => {
  try {
    //coming from route params middleware
    req.body.shopId = req.shop.id;
    console.log(
      "🚀 ~ file: shopsController.js ~ line 62 ~ exports.productCreate= ~ req.shop.id",
      req.shop.id
    );
    console.log(
      "🚀 ~ file: shopsController.js ~ line 62 ~ exports.productCreate= ~  req.body.shopId",
      req.body.shopId
    );
    if (req.file)
      req.body.image = `http://localhost:8000/media/${req.file.filename}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
