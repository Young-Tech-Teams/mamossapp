const { verifyEmail, checkRolesExisting, verifyToken } = require("../middleware/authJwt");
const authController = require("../controllers/user/auth.controller")
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
   
   // Register
   router.post(
      "/signup", 
      [
         verifyEmail, 
         checkRolesExisting
      ],
      authController.signup
   );

   // Login
   router.post("/login", authController.login);

   // Logout
   router.post("/logout", verifyToken, authController.logout);

   // Refresh access token
   router.post("/refresh", authController.refreshToken);

   // Auth route
   app.use("/api/auth", router);
};