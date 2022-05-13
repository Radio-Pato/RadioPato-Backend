const express = require("express");
const router = express.Router();
const {root} = require("../controller/root.controller")
const {authorization} = require('../middlewares/authorization')

router.get("/",authorization,root)

module.exports = router