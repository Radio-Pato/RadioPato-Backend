const express = require("express");
const {/* getByEmail, */getValidLogin, create}= require("../controller/users.controller");
const router = express.Router();

//Acceso del usuario
router.post("/acceso",getValidLogin)

//Registro del usuario
router.post("/registro", create);

//Solo test
/* router.get("/:email",getByEmail)
 */

module.exports = router;