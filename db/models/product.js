const { Sequelize, DataTypes } = require('sequelize');

const SequelizeSlugify=require("sequelize-slugify");

module.exports=(sequelize,DataTypes)=>{
    return sequelize.define("Product",{ //name of the model to export
        name:{
            type:DataTypes.STRING,
        },
        slug:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        },
        price:{
            type: DataTypes.FLOAT,
        },
        image:{
            type:DataTypes.STRING,
        }
    });
    SequelizeSlugify.slugifyModel(Product,{
        source:["name"],
    })
}