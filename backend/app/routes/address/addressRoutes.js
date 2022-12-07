const { verifyToken, isAdmin } = require("../../middleware/authJwt");
const addressController = require("../../controllers/address/address.controller");
const router = require("express").Router();

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept"
        );
        next();
     });

   // Create a new adress
   router.post("/create", verifyToken, addressController.create);

    // Retrieve current user adress with id
    router.get("/list/:id", verifyToken, addressController.findOne);

    // Retrieve all adresses of current user
    router.get("/list-all", verifyToken, addressController.findAll);

    // Retrieve all adresses in database if admin
    router.get(
        "/get-all", 
        [
            verifyToken, 
            isAdmin
        ],
        addressController.getAll
    );
    
    // Update a adress with id
    router.put("/update/:id", verifyToken, addressController.update);

    // Delete a adress with id
    router.delete("/delete/:id", verifyToken, addressController.delete);
      
    app.use('/api/address', router);
};