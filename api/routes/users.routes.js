const express = require("express");
const { test } = require("../controller/test.controller");
const router = express.Router();
const {create,validLogin, logout} = require('../controller/users.controller')
const {authorization} = require('../middlewares/authorization')

//POST
//post email and password for login
router.post("/acceso",validLogin)
//Closed Sesion
router.get("/cierresesion",authorization,logout)
//Register new user
router.post("/registro",create),
//Route protected
router.get("/protegida", authorization, test)
//get comments
//router.get("/comments/")


//PUT
//Edit user
//router.put("/edit/:email")

//DEL
//Delete user
//router.delete("/:email")

module.exports = router