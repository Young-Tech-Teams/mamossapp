const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const StartServer = async() => {
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
      origin: ["http://localhost:3000", "https://app.mamossa.com"],
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

   /** CONNEXION TO LOCALHOST **/
   const https = require("https");
   const fs = require("fs");
   const PORT = process.env.PORT;
   const hostname = "localhost";
   const colors = require("../utils/colors");

   https
   .createServer(
      {
         key: fs.readFileSync("key.pem"),
         cert: fs.readFileSync("cert.pem"),
      },
      app
   )
   .listen(PORT, () => {
      console.log(`\u2794 Server up and running on port ${PORT}`.custom,
      `\nat: https://${hostname}:${PORT}/`.brightMagenta);
   });

}

StartServer();