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

module.exports = {
  getAll: getAll,
  create: create,
};
