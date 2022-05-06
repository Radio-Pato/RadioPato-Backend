const express = require("express");
const app = express();
app.use(express.json())
const port = 3001;

app.get("/", (req, res) => {
  res.send("Test running 🐛");
});

app.listen(port, () => {
  console.log("Sever runing on port", port);
});
