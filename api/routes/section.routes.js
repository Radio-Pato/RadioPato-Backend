const express = require("express");
const router = express.Router();
const {getAll, getByName,create} = require('../controller/sections.controller');
const { authorization } = require("../middlewares/authorization");

//Get all sections
router.get("/", authorization, getAll)
//Get one section
router.get("/:title",authorization,getByName)
//Create a section
router.post("/nuevaseccion",authorization,create)
//PUT
//Edit sections
/* router.put("/section/:id") */

//DELETE
//Delete sections
/* router.delete("/section/:id") */

module.exports=router