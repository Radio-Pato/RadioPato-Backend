const mongoose = require("mongoose");
const app = require("./app");
const port = 3001;
require('dotenv').config();
const urlDatabase = process.env.MONGO_CONECTION;


mongoose.connect(urlDatabase).then(() => {
    console.log("conexión establecida a base datos");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(port, () => {
  console.log("servidor conectado a puerto ", port);
});
