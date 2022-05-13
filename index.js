//Entrypoint of app. Configuration of connections
//Configuration of server
const app = require("./app");
//Variables
require("dotenv").config();
const env = process.env;

//Database configuration
const mongoose = require("mongoose");
const databaseURL =
  env.MONGO_PROTOCOL +
  env.MONGO_USER +
  env.MONGO_PASS +
  env.MONGO_CLUSTER +
  env.MONGO_DB +
  env.MONGO_OPTIONS;
//Database conection
const databaseConnection = (url) => {
  try {
    mongoose.connect(url).then(() => {
      console.info(`Conexión a la base de datos ${env.MONGO_DB} establecida`);
    });
  } catch (error) {
    console.error(
      `Se ha producido un error al conectar con la base datos: ${error}`
    );
  }
};

databaseConnection(databaseURL);
//Server connection
const server = (port) => {
  try {
    app.listen(port, () => {
      console.info(`Servidor funcionando en: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Se ha producido un error en el servidor: ${error}`);
  }
};
server(env.SERVER_PORT);
