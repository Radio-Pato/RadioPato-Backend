const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Comments data schema
const commentModel = new Schema({
  owner: {
    type: String,
    required: [true, "El comentario debe tener un propietario"],
    maxlength: [120, "El nombre del propietario es demasiado largo"],
  },
  text: {
    type: String,
    required: [true, "El comentario debe de tener un texto"],
    maxlength: [1500, "El nombre del propietario es demasiado largo"],
  },
  creationdate: {
    type: String,
    default: new Date().toUTCString(),
  },
  section: {
    type: String,
    required: [true, "La sección debe contener un nombre"],
    maxlength: [120, "El nombre de la sección demasiado largo"],
  },
});
//Exports sections
module.exports = mongoose.model("comments", commentModel);
