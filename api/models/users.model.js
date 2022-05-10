//Import of mongoose, mongoose schema and bcrypt library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypt = require("bcrypt");
const Model = mongoose.model

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Debe introducir un nombre'],
    maxlength:  60,
  },
  email: {
    type: String,
    required: [true,"Debe introducir un correo"],
    maxlength: 120,
  },
  address: {
    type: String,
    required: [true,"Debe introducir una dirección"],
    maxlength: 240,
  },
  building: {
    type: String,
    required: [true,"Debe introducir un edificio"],
    maxlength: 120,
  },
  password: {
    minlength: 8,
    maxlength: 120,
    required: [true,"Debe introducir una contraseña"],
  },
});

userSchema.pre("create", (next) => {
  let user = this;

  if (
    !user.email ||
    !user.password ||
    user.email == undefined ||
    user.password == undefined
  ) {
    return next();
  }

  if (!user.isModified("password")) return next();

  if (user.email && user.password) {
    crypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      crypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
});

module.exports = [Model('Users', userSchema),crypt]