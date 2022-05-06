const express = require("express");
const User = require("../models/users.models");
const router = express.Router();
const bcrypt = require('bcrypt')
router.post("/users", async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});
module.exports = router;
