const express = require('express')
const {json}= require('express')
const app = express()
const user_routes = require('./api/routes/users.routes')
app.use(json())
app.use("/",user_routes)

module.exports = app