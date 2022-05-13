//Configurations of server an routes import
//Import for express server
const expres = require("express");
const compression= require("compression")
const app = expres();
const cors = require('cors')
const { json } = require("express");
const cookieParser = require('cookie-parser');

//Middlewares Server

app.use(cors())
app.use(json())
app.use(compression())
app.use(cookieParser())


//Entrypoint of routes
const users = require("./api/routes/users.routes")
const sections = require("./api/routes/section.routes")
const root = require("./api/routes/root.routes")
app.use("/",root)
app.use("/usuarios",users)
app.use("/secciones",sections)


//Exports
module.exports = app;
