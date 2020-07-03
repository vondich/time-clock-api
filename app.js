const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Time Clock API." });
});

require("./app/routes/worker.routes.js")(app);
require("./app/routes/timelog.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});