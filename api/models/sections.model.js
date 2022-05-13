const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Section data schema
const sectionModel = new Schema({
  title: {
    type: String,
    required: [true, "La sección debe contener un nombre"],
    maxlength: [120, "El nombre de la sección demasiado largo"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "La sección debe contener una descripción"],
  },
  creationdate: {
    type: String,
    default: new Date().toUTCString(),
  },
/*   comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ], */
});
//Exports sections
module.exports = mongoose.model("Sections", sectionModel);
