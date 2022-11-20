const { authJwt } = require("../middleware");
const userController = require("../controllers/user/user.controller");
const router = require("express").Router();

module.exports = function (app) {
   app.use((req, res, next) => {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });
   
   // Test client private content with JWT
   router.get("/client", 
      [
         authJwt.verifyToken,
         authJwt.isClient  
      ],
      userController.userBoard
   );

   // Test admin private content with JWT auth
   router.get(
      "/admin",
      [
         authJwt.verifyToken,
         authJwt.isAdmin
      ],
      userController.adminBoard
   );

   // Updating user informations
   router.put(
      "/update",
      [
         authJwt.verifyToken,
         // authJwt.isClient
      ],
      userController.update
   );

   // Get user information
   router.get("/infos", authJwt.verifyToken, userController.getUserInfos);

   // Get all users informations
   router.get(
      "/get-all", 
      [
         authJwt.verifyToken, 
         authJwt.isAdmin
      ],
      userController.findAllUsers
   );

   // Deleting user from database
   router.delete(
      "/delete",
      [
         authJwt.verifyToken,
      ],
      userController.delete
   )

   app.use("/api/user", router);
};