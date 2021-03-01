const { Product, Shop } = require("../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

// exports.productCreate = async (req, res, next) => {
//   try {
//     if (req.file)
//       req.body.image = `http://localhost:8000/media/${req.file.filename}`;
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };

exports.productList = async (req, res, next) => {
  try {
    const _products = await Product.findAll({
      attributes: { exclude: ["shopId", "createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["id", "name"],
        //attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    res.json(_products);
  } catch (error) {
    next(error);
  }
};

exports.productDetail = async (req, res, next) => {
  res.json(req.product);
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://localhost:8000/media/${req.file.filename}`;
    }
    req.body.id = await req.product.update(req.body);
    res.status(200).json(req.product);
  } catch (error) {
    next(error);
  }
};
