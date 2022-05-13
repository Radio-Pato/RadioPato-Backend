//Import of mongoose, mongoose schema and bcrypt library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//User data schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Debe introducir un nombre"],
    maxlength: [60, "El nombre es demasiado largo"]
  },
  surname:{
	type:String,
	maxlength: [120, "Los apellidos son demasiados largos"],
	default: ""
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
  creationdate:{
	  type:String,
	  default: new Date().toUTCString()
  },
  updatedate:{
	  type:String
  }
});

//Encrypt password before save data
userSchema.pre("save", function (next) {
  let user = this;

  //If user don't change password continue
  if (!user.isModified("password")) return next();

	//Generate salt for password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
		//hasing password
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
		//change value of password for password encrypted
        user.password = hash;
        next();
      });
    });
  }
);
//Exports model
module.exports = mongoose.model("Users", userSchema);
