const express = require("express");
const app = express();
let cookies=require("./data");

app.use(express.json());
//const db=require("./db/models/index");
const db = require("./db/models");
const {product} = require("./db/models/product");
const PORT=8000;
db.sequelize.authenticate();

app.listen(PORT), ()=>{
  console.log(`The application is running on localhost:${PORT}`);
}

db.sequelize.sync();

app.get("/", async(req,res)=>{
  const products= await product.findAll()
  // res.status(200).json(cookies);
  res.status(200).json(products);
});

app.post("/", async (req,res)=>{
  try {

     const newcookie= await {
  id: cookies[cookies.length-1].id+1,
  ...req.body,
  };
  cookies.push(newcookie);
  res.status(201).json(newcookie);
  } 
 
  catch (error) {
    res.status(500).json({"message": error.message})
    
  }
});

app.get("/:cookieId", (req,res)=>{
const {cookieId}=req.params;
const cookieFound =cookies.find((cookie) => cookie.id === +cookieId)
if(cookieFound){
res.status(200).json(cookieFound);
}else{
    res.status(404).json({message: "cookie not found"});
}
});


app.delete("/:cookieId", (req,res)=>{
  const {cookieId}=req.params;
   const cookieFound =cookies.find((cookie) => cookie.id === +cookieId)
  // if(cookieFound){
  //  cookies=
   cookies.filter((cookie)=> cookie !== cookieFound)
  res.status(204).end();
 // }
  //else{
  //     res.status(404).json({message: "cookie not found"});
  // }
  });

 


