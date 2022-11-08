const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const server = require("http").createServer(app);
const dotenv = require("dotenv").config();
const morgan = require("morgan");

var path = require("path");
var bcrypt = require("bcryptjs");

app.use(cors({
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}));

// app.use(fileUpload({
//    createParentPath: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

const db = require("./app/models");
const User = db.user;
const Op = db.Sequelize.Op;

/** SYNC DB SEQUELIZE **/
db.sequelize.sync({force : true})
   .then(() => {
      initial();
      console.log("Database synced");
   })
   .catch((err) => {
      console.error("Error syncing database:" + err.message);
   });

async function initial() {

   await User.create({
      email: "miyuna@gmail.com",
      password: bcrypt.hashSync("Meowmeow", 8),
   })
}

require("./app/routes/routes")(app);

/** CONNEXION TO LOCALHOST **/
const colors = require("./utils/colors");
const join = require("path");
const port = process.env.PORT;
const hostname = "localhost";

server.listen(port, () => console.log(
   `\u2794 Server up and running on port ${port}`.custom,
   `\nat: http://${hostname}:${port}/`.brightMagenta
));