const express = require('express')
const {json}= require('express')
const cors = require('cors')
const app = express()
const user_routes = require('./api/routes/users.routes')
app.use(json())
app.use(cors())

app.use("/users",user_routes)

module.exports = app