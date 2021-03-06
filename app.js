//Configurations of server an routes import
//Import for express server
const expres = require("express");
const compression= require("compression")
const app = expres();
const cors = require('cors')
const { json } = require("express");
const cookieParser = require('cookie-parser');

//Middlewares Server

app.use(cors(
	{
		origin: 'http://localhost:3000',
		credentials: true,
	}
))
app.use(json())
app.use(compression())
app.use(cookieParser())


//Entrypoint of routes
const users = require("./api/routes/users.routes")
const sections = require("./api/routes/section.routes")
const root = require("./api/routes/root.routes")
const comments = require("./api/routes/comments.routes")
app.use("/",root)
app.use("/usuarios",users)
app.use("/secciones",sections)
app.use("/comentarios", comments)


//Exports
module.exports = app;
