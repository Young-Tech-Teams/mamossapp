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
   
   // Test user private content with JWT
   router.get("/user", authJwt.verifyToken, userController.userBoard);

   // Test admin private content with JWT auth
   router.get(
      "/admin",
      [
         authJwt.verifyToken,
         authJwt.isAdmin
      ],
      userController.adminBoard
   );

   // Test admin role
   router.get(
      "/testrole",
      [
         authJwt.verifyToken,
         authJwt.isAdmin
      ],
      userController.adminBoard
   );

   // Get user information
   router.get("/user-infos", authJwt.verifyToken, userController.getUserInfos);

   // Get all users informations
   router.get(
      "/all-users", 
      [
         authJwt.verifyToken, 
         authJwt.isAdmin
      ],
      userController.findAllUsers
   );

   app.use("/api/", router);
};