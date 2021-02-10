const express = require("express");
const app = express();
// let cookies=require("./data");
const {product} = require("./db/models/Product");
//const db=require("./db/models/index");
const db = require("./db/models");
// const cookies = require("./data");


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
    //product is not define NEEDS wait async
    const products = await Product.findAll({ attributes: req.body });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req,res)=>{
  try {

    const newcookie= await Product.create(req.body);
    res.status(201).json(newProduct);
            // {
          // id: cookies[cookies.length-1].id+1,
          // ...req.body,
          // };
          // cookies.push(newcookie);
  res.status(201).json(newcookie);
  } 
 
  catch (error) {
    res.status(500).json({"message": error.message})
    
  }
});


//detail
app.get("/:cookieId", async(req,res)=>{
  try {
    const {cookieId}=req.params;
    const cookieFound =await product.findByPk(cookieId)
if(cookieFound){res.status(200).json(cookieFound);
  }else{res.status(404).json({message: "cookie not found"});
  }
} catch (error) {
    res.status(500).json({message: error.message
    })
  }


});


//put

app.put("/:cookieId", async(req,res)=>{
  try {
    const {cookieId}=req.params;
    const cookieFound =await product.findByPk(cookieId)
if(cookieFound){
  await cookieFound.update(req.body)
  res.status(200).json(cookieFound);

  }else{res.status(404).json({message: "cookie not found"});
  }
} catch (error) {
    res.status(500).json({message: error.message
    })
  }
});

app.delete("/:cookieId", async(req,res)=>{
  try{
  const {cookieId}=req.params;
   const cookieFound =await product.findByPk(cookieId)
  if(cookieFound){
    await cookieFound.destroy();
 
  res.status(204).end();
 }
  else{
      res.status(404).json({message: "cookie not found"});
 }
}
catch(error){
    res.status(500).json({message: error.message});
}
  });

 


