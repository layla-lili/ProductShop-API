const express = require("express");
const db = require("./db/models");
const products =require("./routes/products");
const app = express();

app.use(async (req, res, next) => {
  console.log("middleware");
  const error = {
    status: 500,
    message: "something wrong",
  };
  next();
 
});

// Middleware
app.use(express.json());

app.use("/products", products);

// NOT FOUND MIDDLEWARE
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

// ERROR HANDLING MIDDLEWARE: I SHOULD BE THE LAST ONE!!!!!!
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error"});
});


const PORT=8000;
db.sequelize.authenticate();

app.listen(PORT), ()=>{
  console.log(`The application is running on localhost:${PORT}`);
}

db.sequelize.sync();


 


