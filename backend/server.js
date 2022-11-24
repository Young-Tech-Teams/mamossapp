const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const dotenv = require("dotenv").config();
const morgan = require("morgan");

var path = require("path");
var bcrypt = require("bcryptjs");

app.use(cors({
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
   credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;

/** SYNC DB SEQUELIZE **/
// db.sequelize.sync()
db.sequelize.sync({force : true})
   .then(() => {
      initial();
      console.log("Database synced");
   })
   .catch((err) => {
      console.error("Error syncing database:" + err.message);
   });

async function initial() {
   // creating roles
   await Role.create({
      id: 1,
      name: "admin"
   });
   
   await Role.create({
      id: 2,
      name: "client"
   });

   await Role.create({
      id: 3,
      name: "livreur"
   });

   // creating user
   await User.create({
      email: "miyuna@gmail.com",
      password: bcrypt.hashSync("Meowmeow", 8),
      roleId: 1
   })
};

require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);

/** CONNEXION TO LOCALHOST **/
const colors = require("./utils/colors");
const join = require("path");
const port = process.env.PORT;
const hostname = "localhost";

server.listen(port, () => console.log(
   `\u2794 Server up and running on port ${port}`.custom,
   `\nat: https://${hostname}:${port}/`.brightMagenta
));