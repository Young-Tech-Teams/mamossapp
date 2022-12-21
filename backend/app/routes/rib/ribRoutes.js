const { verifyToken, isAdmin } = require("../../middleware/authJwt");
const ribController = require("../../controllers/impt/rib.controller.js");
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

   // Create a new rib
   router.post("/create", verifyToken, ribController.create);

    // Retrieve current user rib with id
    router.get("/list/:id", verifyToken, ribController.findOne);

    // Retrieve all ribs of current user
    router.get("/list-all", verifyToken, ribController.findAll);

    // Retrieve all ribs in database if admin
    router.get(
        "/get-all", 
        [
            verifyToken, 
            isAdmin
        ],
        ribController.getAll
    );
    
    // Update a rib with id
    router.put("/update/:id", verifyToken, ribController.update);

    // Delete a rib with id
    router.delete("/delete/:id", verifyToken, ribController.delete);
      
    app.use('/.netlify/functions/api/rib', router);
};