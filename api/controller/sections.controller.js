const Sections = require("../models/sections.model");
async function create(req, res) {
  try {
    await Sections.create(req.body).then(() => {
      return res.status(200).json({
        status: 200,
        data: req.body,
        message: "Sección creada correctamente",
      });
    });
  } catch (error) {
    const errosplit = error.message.split(" ");

    if (errosplit[0] === "E11000") {
      return res.status(400).json({
        status: 400,
        error: `Ya hay una sección con el nombre ${req.body.title}`,
      });
    }

    return res.status(400).json({
      status: 400,
      error: error,
    });
  }
}

async function getAll(req, res) {
  try {
    Sections.find({}).then((found) => {
      if (found.length === 0 || !found) {
        return res.status(400).json({
          status: 400,
          message: "No hay secciones disponibles",
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
      message: "No hay secciones disponibles",
    });
  }
}

async function getByName(req, res) {
  const title = req.params.title;
  try {
    Sections.findOne({ title: title }, (error, found) => {
      if (!found) {
        return res.status(400).json({
          status: 400,
          message: "Sección no encontrada",
        });
      }
      const date = new Date(Date.parse(found.creationdate));
      return res.status(200).json({
        status: 200,
        data: {
          Titulo: found.title,
          description: found.description,
          creationdate:
            date.getDate() +
            "-" +
            date.getMonth() +
            "-" +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        },
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
module.exports = {
  getAll: getAll,
  getByName: getByName,
  create: create,
};
