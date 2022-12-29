const { verifyToken, isAdmin, isClient, isLivreur, isAdminOrClient, isAdminOrLivreur } = require("../../middleware/authJwt");
const ordersController = require("../../controllers/orders/orders.controller.js");
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
   router.post("/create", [ verifyToken, isAdminOrClient ], ordersController.create);

    // Retrieve current user adress with id
    router.get("/list/:id", verifyToken, ordersController.findOne);

    // Retrieve all adresses of current user
    router.get("/list-all", verifyToken, ordersController.findAll);

    // Retrieve all adresses in database if admin
    router.get("/get-all", [ verifyToken, isAdminOrLivreur ], ordersController.getAll);
    
    // Update a adress with id
    router.put("/update/:id", [ verifyToken, isAdmin ], ordersController.update);

    // Delete a adress with id
    router.delete("/delete/:id", [ verifyToken, isAdmin ], ordersController.delete);
      
    app.use('/.netlify/functions/api/orders', router);
};