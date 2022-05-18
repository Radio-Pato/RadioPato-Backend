const express = require("express");
const router = express.Router();
const {
  create,
  validLogin,
  logout,
  getByEmail,
  deleted
} = require("../controller/users.controller");
const { authorization } = require("../middlewares/authorization");

//Register new user
router.post("/registro", create);
//Login
router.post("/acceso", validLogin);
//Get user data
router.post("/miperfil",authorization, getByEmail);
//Delete user
router.delete("/miperfil",authorization,deleted)
//Closed Sesion
router.get("/cierredesesion", logout);

//Route protected
//router.get("/protegida", authorization, test)

module.exports = router;