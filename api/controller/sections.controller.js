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
    await Sections.find({}, (error, found) => {
      if (found.length === 0) {
        return res.status(400).json({
          status: 400,
          message: "No hay secciones disponibles",
        });
      }
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

      return res.status(200).json({
        status: 200,
        data: {
          Titulo: found.title,
          description: found.description,
          creationdate: found.creationdate,
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
