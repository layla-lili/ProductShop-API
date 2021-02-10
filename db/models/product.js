const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      validate: {allowNull: false,  },
    },
    slug: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
      validate: {min: 20},
    },
    image: {
      type: DataTypes.STRING,
      validate:{isUrl: true},
    },
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  return Product;
};