const { Users, crypt } = require("../models/users.model");

async function create(req, res) {
  try {
    await Users.create(req.body);
    res.status(200).json({
      status: 200,
      data: req.body,
      message: "Se ha registrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Se ha producido un error al registrarse. Intentelo de nuevo",
    });
  }
}

async function validLogin(req, res) {
  const { email, password } = req.body;

  if (email.length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Debe introducir un correo",
    });
  }

  if (password.length === 0) {
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
    Users.find({ email: email }, (error, found) => {
      if (found.length === 0) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      if (!crypt.compareSync(password, found[0].password)) {
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
      error: error,
    });
  }
}
module.exports = {
  create: create,
  validLogin: validLogin,
};
