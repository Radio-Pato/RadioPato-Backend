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
    return res.status(400).json({
      status: 400,
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
    const token = jwt.sign(email + password, process.env.API_KEY);
    Users.find({ email: email }, (error, found) => {
      if (found.length === 0) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      if (!bcrypt.compareSync(password, found[0].password)) {
        return res.status(400).json(messageErrorPasswordUser);
      }

      return res
        .cookie("access_token", token, {
          httpOnly: true,
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

async function logout(req,res){
	return res.clearCookie("access_token")
			.status(200)
			.json({
				status:200,
				message: "Sesión cerrada correctamente"
			})
}
module.exports = {
  create: create,
  validLogin: validLogin,
  logout:logout
};
