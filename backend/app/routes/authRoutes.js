const { verifyEmail, checkRolesExisting, verifyToken } = require("../middleware/authJwt");
const authController = require("../controllers/user/auth.controller")
const router = require("express").Router();

module.exports = function (app) {
   app.use((req, res, next) => {
      let HEADERS = {
         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
         'Content-Type': 'application/json', //optional
         'Access-Control-Allow-Methods': 'POST, OPTIONS',
         'Access-Control-Max-Age': '8640'
      }
      HEADERS['Access-Control-Allow-Origin'] = '*'
      HEADERS['Vary'] = 'Origin'

      exports.handler = async function (event, context) {
         try {
           if (event.httpMethod === 'OPTIONS') {
             return { statusCode: '204', HEADERS }
           }
           if (event.httpMethod === 'POST') {
               const body = JSON.parse(event.body)
               //Your code goes here
       
              return {
                statusCode: 200,
                body: 'Success',
                HEADERS
              } 
        
           }
           return {
             statusCode: 401,
             HEADERS
           }
         } catch (e) {
           console.error(e)
           return {
             statusCode: 500,
             body: e.toString()
           }
         }
       }
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