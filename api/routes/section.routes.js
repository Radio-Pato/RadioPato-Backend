const express = require("express");
const router = express.Router();
const {getAll, create} = require('../controller/sections.controller');

//Get all sections
router.get("/", getAll)
//Create a section
router.post("/nuevaseccion", create)

module.exports=router