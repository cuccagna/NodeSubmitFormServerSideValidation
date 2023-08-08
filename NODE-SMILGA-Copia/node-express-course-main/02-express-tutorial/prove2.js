const express = require("express");
const app = express();

const { people } = require("./data");
app.use(express.static("./methods-public"));
//app.use(express.json());

//Normale get
app.get("/api/people", function (req, res) {
  res.status(200).json({ success: true, data: people });
});

app.post("/login", function (req, res) {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("PLEASE PROVIDE CREDENTIALS");
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
