const express = require("express");

const app = express();
const cors = require("cors");


app.use(cors());

const cookies = [
  {
    id: 1,
    name: "Chocolate Chip Cookies",
    slug: "chocolate-chip-cookies",
    description: "Delicious cookie.. sold by dozen",
    price: 15,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg",
  },
  {
    id: 2,
    name: "Peanut Butter Cookies",
    slug: "peanut-butter-cookies",
    description: "Delicious cookie.. sold by dozen",
    price: 3,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/dcd4f799-7353-4e56-ba50-623581cba3bc.jpg",
  },
  {
    id: 3,
    name: "Salted Caramel Cookies",
    slug: "salted-caramel-cookies",
    description: "Delicious cookie.. sold by dozen",
    price: 10,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/586da0ed-8a79-4390-9137-f60852ca312a.jpg",
  },
];

app.get("/products", (req, res) => {
  console.log("HELLO");
  res.json(cookies);
});



app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});