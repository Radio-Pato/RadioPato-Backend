const User = require("../models/users.models");
const bcrypt = require("bcrypt");
async function create(req, res) {
  try {
    await User.create(req.body);

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
}

function getByEmail(req, res) {
  try {
    const email = req.params.email;
    User.find({ email: email }, (err, found) => {
      if (found == "") {
        res.status(400).json({
          status: 400,
          message: "Usuario no encontrado",
        });
      } else {
        res.status(200).json(found);
      }

      if (err) {
        res.status(400).json(err);
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

function getValidLogin(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
	console.log(email, password)
    User.find({ email: email }, (err, found) => {



      if (found =="") {
        res.status(400).json({
          status: 400,
          message: "Usuario o contraseña no válido",
        });
      }

	  if (bcrypt.compareSync(password, found[0].password)) {
		res.status(400).json({
		  status: 400,
		  message: "Usuario o contraseña no válido",
		});
	  }

      res.status(200).json({
        status: 200,
        message: "Credenciales válidas",
      });
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = {
  create: create,
  getByEmail: getByEmail,
  getValidLogin: getValidLogin,
};
