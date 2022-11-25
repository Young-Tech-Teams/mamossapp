const { authJwt } = require("../../middleware");
const paymentController = require("../../controllers/payment/payment.controller.js");
const router = require("express").Router();

module.exports = function (app) {
   app.use(function (req, res, next) {
       res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept"
       );
       next();
   });

   // Create a new adress
   router.post("/create", authJwt.verifyToken, paymentController.create);

    // Retrieve current user adress with id
    router.get("/list/:id", authJwt.verifyToken, paymentController.findOne);

    // Retrieve all adresses of current user
    router.get("/list-all", authJwt.verifyToken, paymentController.findAll);

    // Retrieve all adresses in database if admin
    router.get(
        "/get-all", 
        [
            authJwt.verifyToken, 
            authJwt.isAdmin
        ],
        paymentController.getAll
    );
    
    // Update a adress with id
    router.put("/update/:id", authJwt.verifyToken, paymentController.update);

    // Delete a adress with id
    router.delete("/delete/:id", authJwt.verifyToken, paymentController.delete);
      
    app.use('/api/payment', router);
};