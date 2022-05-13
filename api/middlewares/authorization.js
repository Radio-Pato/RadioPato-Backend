const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).json({
      status: 403,
      message: "Acceso denegado",
    });
  }

  try {
    const data = jwt.verify(token, process.env.API_KEY);
    req.email = data.email;
    return next();
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: "Acceso denegado",
    });
  }
};

module.exports = { authorization };
