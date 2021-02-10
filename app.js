const express = require("express");
const app = express();
// let products=require("./data");
const {Product} = require("./db/models");
console.log("🚀 ~ file: app.js ~ line 5 ~ Product", Product)
//const db=require("./db/models/index");
const db = require("./db/models");
// const products = require("./data");


app.use(express.json());

const PORT=8000;
db.sequelize.authenticate();

app.listen(PORT), ()=>{
  console.log(`The application is running on localhost:${PORT}`);
}

db.sequelize.sync();

app.get("/", async (req, res) => {
  console.log(req.body);
  try {
    //Product is not define NEEDS wait async
    const products = await Product.findAll({ attributes: req.body });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req,res)=>{
  try {

    const newProduct= await Product.create(req.body);
    res.status(201).json(newProduct);
            // {
          // id: products[products.length-1].id+1,
          // ...req.body,
          // };
          // products.push(newProduct);
  res.status(201).json(newProduct);
  } 
 
  catch (error) {
    res.status(500).json({"message": error.message})
    
  }
});


//detail
app.get("/:productId", async(req,res)=>{
  try {
    const {productId}=req.params;
    console.log("🚀 ~ file: app.js ~ line 57 ~ app.get ~ req.params", req.params)
    console.log("🚀 ~ file: app.js ~ line 57 ~ app.get ~ {productId}", {productId})
    
    const productFound =await Product.findByPk(productId)
if(productFound){res.status(200).json(productFound);
  }else{res.status(404).json({message: "Product not found"});
  }
} catch (error) {
    res.status(500).json({message: error.message
    })
  }


});


//put

app.put("/:productId", async(req,res)=>{
  try {
    const {productId}=req.params;
    const productFound =await Product.findByPk(productId)
if(productFound){
  await productFound.update(req.body)
  res.status(200).json(productFound);

  }else{res.status(404).json({message: "Product not found"});
  }
} catch (error) {
    res.status(500).json({message: error.message
    })
  }
});

app.delete("/:productId", async(req,res)=>{
  try{
  const {productId}=req.params;
   const productFound =await Product.findByPk(productId)
  if(productFound){
    await productFound.destroy();
 
  res.status(204).end();
 }
  else{
      res.status(404).json({message: "Product not found"});
 }
}
catch(error){
    res.status(500).json({message: error.message});
}
  });

 


