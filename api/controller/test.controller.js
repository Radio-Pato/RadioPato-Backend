function test(req, res) {
  return res.status(200).json({
    status: 200,
    data: req.body,
    message: "Usuario logeado",
  });
}
module.exports = { test: test };
