const fs = require("fs");
const object = `["basile", "Manon"]`;
fs.writeFile("test.json", object, (err) => {
  if (err) {
    throw err;
  } else console.log("file succesfully written");
});
