const express = require("express");
const router = express.Router();
const {getAll, getByName,create} = require('../controller/sections.controller');

//Get all sections
router.get("/", getAll)
//Get one section
router.get("/:title", getByName)
//Create a section
router.post("/nuevaseccion", create)
//PUT
//Edit sections
/* router.put("/section/:id") */

//DELETE
//Delete sections
/* router.delete("/section/:id") */

module.exports=router