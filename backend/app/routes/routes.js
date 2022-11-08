const { verifySignUp, authJwt } = require("../middleware");
const userController = require("../controllers/userController");
const router = require("express").Router();

module.exports = function (app) {
   app.use((req, res, next) => {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });
   
   router.post("/signup", verifySignUp.checkDuplicateEmail, userController.signup);
   router.post("/login", userController.login);
   router.post("/logout", authJwt.verifyToken, userController.logout);
   router.post("/refresh", userController.refreshToken);

   router.get("/user", authJwt.verifyToken, userController.userBoard);
   router.get("/user-infos", authJwt.verifyToken, userController.getUserInfos);

   app.use("/api/auth", router);
};