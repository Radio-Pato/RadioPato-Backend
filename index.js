//Entrypoint of app. Configuration of connections
//Configuration of server
const app = require("./app");
//Variables
require("dotenv").config();
const env = process.env;

//Database configuration
const mongoose = require("mongoose");
const database =
  env.MONGO_PROTOCOL +
  env.MONGO_USER +
  env.MONGO_PASS +
  env.MONGO_CLUSTER +
  env.MONGO_DB +
  env.MONGO_OPTIONS;
console.log = database;
mongoose
  .connect(database)
  .then(() => {
    console.info("Conexión a base datos establecida");
  })
  .catch((error) =>
    console.error(
      "Se ha producido un error al conectar con la base datos: ",
      error
    )
  );

//Server connection
app.listen(env.SERVER_PORT, (err)=>{
	if(err) console.error("Se ha producido un error en el sevidor: ",env.SERVER_PORT)
})