//Configurations of server an routes import
//Import for express server
const expres = require("express");
const app = expres();
const cors = require('cors')
const { json } = require("express");

//Middlewares Server
const usersRoutes = require("./api/routes/users.routes")
app.use(cors())
app.use(json())


//Entrypoint of routes
app.use("/users",usersRoutes)
//app.use("/sections",sections_controller)


//Exports
module.exports = app;
