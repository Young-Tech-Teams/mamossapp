const { verifyToken, isClient, isAdmin } = require("../middleware/authJwt");
const userController = require("../controllers/user/user.controller");
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
   
   // Test client private content with JWT
   router.get("/client", 
      [
         verifyToken,
         isClient  
      ],
      userController.userBoard
   );

   // Test admin private content with JWT auth
   router.get(
      "/admin",
      [
         verifyToken,
         isAdmin
      ],
      userController.adminBoard
   );

   // Updating user informations
   router.put(
      "/update",
      [
         verifyToken,
         // isClient
      ],
      userController.update
   );

   // Get user information
   router.get("/infos", verifyToken, userController.getUserInfos);

   // Get all users informations
   router.get(
      "/get-all", 
      [
         verifyToken, 
         isAdmin
      ],
      userController.findAllUsers
   );

   // Deleting user from database
   router.delete(
      "/delete",
      [
         verifyToken,
      ],
      userController.delete
   )

   app.use("/api/user", router);
};