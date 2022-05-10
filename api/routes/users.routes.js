const express = require("express");
const router = express.Router();
const {create,validLogin} = require('../controller/users.controller')

//POST
//post email and password for login
router.post("/acceso",validLogin)
//Register new user
router.post("/registro",create)
//get comments
//router.get("/comments/")


//PUT
//Edit user
//router.put("/edit/:email")

//DEL
//Delete user
//router.delete("/:email")

module.exports = router