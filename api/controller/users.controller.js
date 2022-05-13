const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const errosplit = error.message.split(" ");

    if (errosplit[0] === "E11000") {
      return res.status(400).json({
        status: 400,
        error: "El correo ya existe en nuestra base de datos",
      });
    }
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
}

async function validLogin(req, res) {
	if(!req.body.email || !req.body.password){
		return res.status(400).json({
			status: 400,
			message: req.body,
		  });
	}
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
    const token = jwt.sign(email + password, process.env.API_KEY);

    Users.findOne({ email: email }, (error, found) => {
      if (!found) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      if (!bcrypt.compareSync(password, found.password)) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      return res
        .cookie("access_token", token,{

		})
        .status(200)
        .json({
          status: 200,
          message: "Credenciales válidas, bienvenida/o",
        });
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "No ha sido posible verificar sus credenciales",
      error: error.message,
    });
  }
}
async function getByEmail(req, res) {
  const email = req.body.email;

  try {
    Users.findOne({ email: email }, (error, found) => {
      if (!found) {
        return res.status(400).json({
          status: 400,
          message: "usuario no encontrado",
        });
      }
      return res.status(200).json({
        status: 200,
        data: found,
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Se ha producido un error al obtener los datos",
      error: error,
    });
  }
}

async function logout(req, res) {
  return res.clearCookie("access_token").status(200).json({
    status: 200,
    message: "Sesión cerrada correctamente",
  });
}
module.exports = {
  create: create,
  validLogin: validLogin,
  getByEmail: getByEmail,
  logout: logout,
};
