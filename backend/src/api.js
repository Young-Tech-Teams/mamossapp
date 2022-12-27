const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const mysql2 = require("mysql2");

const app = express();

const whitelist = ["http://localhost:3000", "https://app.mamossa.com"];
const corsOptions = {
   origin: (origin, callback) => {
       if (whitelist.indexOf(origin) !== -1) {
         callback(null, true)
       } else {
         callback(new Error())
       }
     }
   }

app.use(cors({
   corsOptions,
   origin: whitelist,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const database = require("../app/models");
const User = database.user;
const Role = database.role;

/** SYNC DB SEQUELIZE **/
// database.sequelize.sync({force : true})
database.sequelize.sync()
   .then(() => {
      // initialRecords();
      console.log("The database has been synced successfully");
   })
   .catch((err) => {
      console.error("An error occurred while syncing the database" + err.message);
   });
      
   async function initialRecords() {
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
         email: "lunayu@gmail.com",
         password: bcrypt.hashSync("Meowmeow", 8),
         roleId: 1
      });
   };

require("../app/routes/authRoutes")(app);
require("../app/routes/userRoutes")(app);
require("../app/routes/address/addressRoutes")(app);
require("../app/routes/payment/paymentRoutes")(app);
require("../app/routes/impt/ribRoutes")(app);
require("../app/routes/impt/idCardRoutes")(app);

const router = express.Router();

router.get("/", (req, res) => {
   res.json({
      "hello": "it's working"
   });
});
   
router.get("/test", (req, res) => {
   res.json({
      "hello": "it's testing"
   });
});
   
app.use("/.netlify/functions/api", router);
   
module.exports.handler = serverless(app);