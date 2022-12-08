const { verifyToken, isAdmin } = require("../../middleware/authJwt");
const paymentController = require("../../controllers/payment/payment.controller.js");
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

   // Create a new adress
   router.post("/create", verifyToken, paymentController.create);

    // Retrieve current user adress with id
    router.get("/list/:id", verifyToken, paymentController.findOne);

    // Retrieve all adresses of current user
    router.get("/list-all", verifyToken, paymentController.findAll);

    // Retrieve all adresses in database if admin
    router.get(
        "/get-all", 
        [
            verifyToken, 
            isAdmin
        ],
        paymentController.getAll
    );
    
    // Update a adress with id
    router.put("/update/:id", verifyToken, paymentController.update);

    // Delete a adress with id
    router.delete("/delete/:id", verifyToken, paymentController.delete);
      
    app.use('/api/payment', router);
};