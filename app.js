//Import for express server
const expres = require("express");
const app = expres();
//Middlewares Server
const { json, cors } = require("./api/middlewares/server.middlewares");
app.use((req, res, next) => {
  cors();
  json();
  next();
});

//Exports
module.exports = app;
