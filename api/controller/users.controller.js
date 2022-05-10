const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
async function create(req, res) {
  try {
    await Users.create(req.body).then(() => {
      return res.status(200).json({
        status: 200,
        data: req.body,
        message: "Se ha registrado correctamente",
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

async function validLogin(req, res) {
  if (req.body.email.length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Debe introducir un correo",
    });
  }

  if (req.body.password.length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Debe introducir una contraseña",
    });
  }
  try {
    const messageErrorPasswordUser = {
      status: 400,
      message: "Correo o contraseña incorrecto",
    };
    const email = req.body.email;
    const password = req.body.password;
    Users.find({ email: email }, (error, found) => {
      if (found.length === 0) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      if (!bcrypt.compareSync(password, found[0].password)) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      return res.status(200).json({
        status: 200,
        message: "Credenciales válidas, bienvenida/o",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Se ha producido un error. Intentelo de nuevo",
      error: error.message,
    });
  }
}
module.exports = {
  create: create,
  validLogin: validLogin,
};
