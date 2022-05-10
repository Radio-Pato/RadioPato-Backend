//Configurations of server an routes import
//Import for express server
const expres = require("express");
const app = expres();
//Middlewares Server
const { json, cors } = require("./api/middlewares/server.middlewares");
const usersController = require('./api/controller/users.controller')
app.use((req, res, next) => {
  cors();
  json();
  next();
});

//Entrypoint of routes
app.use("/users",usersController)
//app.use("/sections",sections_controller)


//Exports
module.exports = app;
