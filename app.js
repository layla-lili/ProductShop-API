const express = require("express");
const db = require("./db/models");
const products = require("./routes/products");
const shops = require("./routes/shops");
const app = express();
const path = require("path");

// Import the library:
const cors = require("cors");
// Then use it before your routes are set up:
app.use(cors());

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
app.use("/shops", shops);

app.use("/media", express.static(path.join(__dirname, "media")));

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
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = 8000;
//db.sequelize.sync({ force: true });
db.sequelize.sync();
//db.sequelize.sync({ alter: true });
db.sequelize.authenticate();

app.listen(PORT),
  () => {
    console.log(`The application is running on localhost:${PORT}`);
  };
