const { verifyToken, isClient, isAdmin, isLivreur } = require("../middleware/authJwt");
const userController = require("../controllers/user/user.controller");
const db = require("../models");
const User = db.user;
const Role = db.role;
const router = require("express").Router();

module.exports = function (app) {
   app.use((req, res, next) => {
      res.header(
            // "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
      next();
   });

   router.get("/roles", [ verifyToken, isAdmin ], userController.findRoles);
   
   // Test client private content with JWT
   router.get("/client", [ verifyToken, isClient ], userController.userBoard);

   // Test admin private content with JWT auth
   router.get("/admin", [ verifyToken, isAdmin ], userController.adminBoard);

   // Test livreur private content with JWT auth
   router.get("/livreur", [ verifyToken, isLivreur ], userController.livreurBoard);

   // Updating user informations
   router.put("/update", verifyToken, userController.update);
   router.put("/update/:id", [ verifyToken, isAdmin ], userController.updateById); // for admin

   // Get user information
   router.get("/infos", verifyToken, userController.getUserInfos);
   router.get("/infos/:id", [ verifyToken, isAdmin ], userController.findOne); // for admin
   
   // Get all users informations
   router.get("/get-all", [ verifyToken, isAdmin ], userController.findAllUsers);

   // Deleting user from database
   router.delete("/delete/:id", [ verifyToken, isAdmin ], userController.delete)

   app.use("/.netlify/functions/api/user", router);
};