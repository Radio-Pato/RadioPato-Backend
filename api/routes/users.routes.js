const express = require("express");
const {getByEmail,getValidLogin, create}= require("../controller/users.controller");
const router = express.Router();

//Solo test
router.get("/:email",getByEmail)

//Acceso del usuario
router.get("/acceso",getValidLogin)

//Registro del usuario
router.post("/registro", create);


module.exports = router;
