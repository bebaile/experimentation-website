const express = require("express");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else console.log(`Server running on port ${port}`);
});

app.get("/:amount", (req, res) => {
  const amount = req.params.amount;
  const param = `[{"amount": ${amount}}]`;
  fs.writeFile("preference.json", param, (err) => {
    if (err) {
      throw err;
    } else res.status(200).send("paramètres bien enregistrés");
  });
});
