const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
      // validate: { isUrl: true },
    },
  });
  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });
  return Shop;
};
