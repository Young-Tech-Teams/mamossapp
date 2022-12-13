const { verifyToken, isClient, isAdmin, isLivreur } = require("../middleware/authJwt");
const userController = require("../controllers/user/user.controller");
const router = require("express").Router();

module.exports = function (app) {
   app.use((req, res, next) => {
      res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
      ', x-access-token, Accept',
         'Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS',
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

   // Test livreur private content with JWT auth
   router.get(
      "/livreur", 
      [
         verifyToken,
         isLivreur
      ],
      userController.livreurBoard
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