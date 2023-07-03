const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const enseignantRoute = require("./routes/enseigant");
const apprenantRoute = require("./routes/apprenant");

const coursRoute = require("./routes/cours");
const tdRoute = require("./routes/td");
const testRoute = require("./routes/test");
const quizRoute = require("./routes/quiz");
const commentRoute = require("./routes/comment");
const messageRoute = require("./routes/messages");
const userRoute = require("./routes/user");
// Activez CORS pour toutes les routes
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/cours", coursRoute);
app.use("/enseignant", enseignantRoute);
app.use("/td", tdRoute);
app.use("/test", testRoute);
app.use("/quiz", quizRoute);
app.use("/comment", commentRoute);
app.use("/message", messageRoute);
app.use("/apprenant", apprenantRoute);
app.use("/user", userRoute);

module.exports = app;
