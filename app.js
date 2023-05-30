const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const enseignantRoute = require("./routes/enseigant");
const coursRoute = require("./routes/cours");
const tdRoute = require("./routes/td");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/cours", coursRoute);
app.use("/enseignant", enseignantRoute);
app.use("/td", tdRoute);

module.exports = app;
