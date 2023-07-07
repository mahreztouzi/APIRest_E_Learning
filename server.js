const http = require("http");
const app = require("./app");
const port = 8080;

const server = http.createServer(app);
app.get("/", (req, res) => {
  res.send("hello word !");
});
server.listen(port || process.env.PORT, () =>
  console.log(`le serveur est demarrer ${port}`)
);
//hello
