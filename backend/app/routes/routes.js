const { verifySignUp, authJwt } = require("../middleware");
const authController = require("../controllers/user/auth.controller")
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
   
   router.post("/signup", verifySignUp.checkDuplicateEmail, authController.signup);
   router.post("/login", authController.login);
   router.post("/logout", authJwt.verifyToken, authController.logout);
   router.post("/refresh", authController.refreshToken);

   router.get("/user", authJwt.verifyToken, userController.userBoard);
   router.get("/user-infos", authJwt.verifyToken, userController.getUserInfos);
   router.get("/all-users", authJwt.verifyToken, userController.findAllUsers);

   app.use("/api/auth", router);
};