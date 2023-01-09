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

   // Get user information
   router.get("/infos", verifyToken, userController.getUserInfos);

   // Get all users informations
   router.get("/get-all", [ verifyToken, isAdmin ], userController.findAllUsers);

   // router.get("/edit-user", verifyToken, async(req, res) => {
   //    try {
   //       const id = req.userId;
   //       const userData = await User.findById({ _id: id });
   //       res.render("edit-user", { user: userData });
   //    } catch (err) {
   //       console.log(err.message);
   //    }
   // })

   // Deleting user from database
   router.delete("/delete", verifyToken, userController.delete)

   app.use("/.netlify/functions/api/user", router);
};