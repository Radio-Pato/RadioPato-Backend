const express = require("express");
const router = express.Router();
const {getAll, create, deleted} = require('../controller/comments.controller');

//Get all comments
router.get("/", getAll)
//Create a comment
router.post("/", create)

//DELETE
//Delete comment
router.delete("/", deleted)

module.exports=router