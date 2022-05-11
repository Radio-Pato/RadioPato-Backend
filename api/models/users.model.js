//Import of mongoose, mongoose schema and bcrypt library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Debe introducir un nombre"],
    maxlength: 60,
  },
  email: {
    type: String,
    required: [true, "Debe introducir un correo electrónico"],
    maxlength: [120, "El correo electrónico es demasiado largo"],
	unique:true
  },
  address: {
    type: String,
    required: [true, "Debe introducir una dirección"],
    maxlength: [240,"La dirección es demasiado larga"],
  },
  building: {
    type: String,
    required: [true, "Debe introducir un edificio"],
    maxlength: [120,"El nombre del edificio es demasiado largo"],
  },
  password: {
    type: String,
    minlength: [8,"La contraseña debe tener entre 8 y 120 carácteres"],
    maxlength: [120,"La contraseña debe tener entre 8 y 120 carácteres"],
    required: [true, "Debe introducir una contraseña"],
  },
});


userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();


    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
);

module.exports = mongoose.model("Users", userSchema);
