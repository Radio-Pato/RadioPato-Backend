const express = require("express");
const User = require("../models/users.models");
const router = express.Router();
router.post("/users", async (req, res) => {
  try {
	await User.create(req.body)

    res.status(200).json({
      status: 200,
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

router.get("/users", (req, res) => {
  try {
	  User.find({}, (err,found) =>{
		  if(found === null){
			res.status(200).json("Usuario no encontrado")
		  }
		 res.status(200).json(found)
	})

  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});
module.exports = router;
