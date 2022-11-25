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

    // Retrieve a single adress with id
    router.get("/list", addressController.findAddress);

    // Update a adress with id
    router.put("/update", authJwt.verifyToken, addressController.update);

    // Delete a adress with id
    router.delete("/delete/:id", authJwt.verifyToken, addressController.delete);
      
    app.use('/api/address', router);
};