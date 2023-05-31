const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const enseignantRoute = require("./routes/enseigant");
const coursRoute = require("./routes/cours");
const tdRoute = require("./routes/td");
const testRoute = require("./routes/test");
const quizRoute = require("./routes/quiz");
const commentRoute = require("./routes/comment");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/cours", coursRoute);
app.use("/enseignant", enseignantRoute);
app.use("/td", tdRoute);
app.use("/test", testRoute);
app.use("/quiz", quizRoute);
app.use("/comment", commentRoute);

module.exports = app;
