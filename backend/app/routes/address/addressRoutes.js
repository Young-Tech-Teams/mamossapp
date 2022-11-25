const { authJwt } = require("../../middleware");
const addressController = require("../../controllers/address/address.controller");
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
   router.post("/create", authJwt.verifyToken, addressController.create);

    // Retrieve current user adress with id
    router.get("/list/:id", authJwt.verifyToken, addressController.findOne);

    // Retrieve all adresses of current user
    router.get("/list-all", authJwt.verifyToken, addressController.findAll);

    // Retrieve all adresses in database if admin
    router.get(
        "/get-all", 
        [
            authJwt.verifyToken, 
            authJwt.isAdmin
        ],
        addressController.findAll
    );
    
    // Update a adress with id
    router.put("/update/:id", authJwt.verifyToken, addressController.update);

    // Delete a adress with id
    router.delete("/delete/:id", authJwt.verifyToken, addressController.delete);
      
    app.use('/api/address', router);
};