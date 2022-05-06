const mongoose = require("mongoose");
const app = require("./app");
const port = 3001;
const urlDatabase =
  "mongodb+srv://Admin:yVVonhsigClRuH3P@radiopatocluster.qzhuw.mongodb.net/RadioPato?retryWrites=true&w=majority";


mongoose.connect(urlDatabase).then(() => {
    console.log("conexión establecida a base datos");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(port, () => {
  console.log("servidor conectado a puerto ", port);
});
