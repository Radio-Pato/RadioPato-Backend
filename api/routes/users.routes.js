const express = require("express");
const {/* getByEmail, */getValidLogin, create}= require("../controller/users.controller");
const router = express.Router();

//Acceso del usuario
router.get("/acceso/:email/:password",getValidLogin)

//Registro del usuario
router.post("/registro", create);

//Solo test
/* router.get("/:email",getByEmail)
 */

module.exports = router;