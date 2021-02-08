const express = require("express");
let cookies=require("./data");
const app = express();
app.use(express.json());
// const cors = require("cors");
// app.use(cors());

app.get("/", (req,res)=>{
  res.status(200).json(cookies);
});

app.post("/", (req,res)=>{
  req.body.id=cookies[cookies.length-1].id+1;
  cookies.push(req.body);
  if(cookieFound) res.status(200).json(cookies)
  else
  res.status(201).json({message:"created"});
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
  if(cookieFound){
   cookies=cookies.filter((cookie)=> cookie !== cookieFound)
  res.status(204).end();
  }else{
      res.status(404).json({message: "cookie not found"});
  }
  });



const PORT=8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});




// // app.get("/", (req, res) => {
// //   console.log("HELLO");
// //   res.json(cookies);
// // });


// app.get("/:cookieId", (req, res) => {
//   const { cookieId }=req.params;
//   const cookieFound = products.find((cookie) => cookie.id === +cookieId);
//   if(cookieFound){
//     res.status(200).json(cookieFound);
//   }else{
//     res.status(404).json({message:"cookie not found"})
//   }
 
// });

// app.delete("/:cookieId", (req, res) => {
//   const {cookieId}= req.params;
//   const cookieFound = products.find((cookie) => cookie.id === +cookieId);
//   if(cookieFound){
//    cookies=cookies.filter((cookie)=> cookies.id !== cookieFound);
   
//   }else{
//     res.status(404).json({message:"cookie not found"})
//   }
// });