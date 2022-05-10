//Json middelware for express
const { json } = require("express");
const cors = require("cors");
module.exports = [json(), cors()];
