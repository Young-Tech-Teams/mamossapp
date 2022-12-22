const { verifyToken, isAdmin } = require("../../middleware/authJwt");
const idCardController = require("../../controllers/impt/id_card.controller");
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

   // Create a new id_card
   router.post("/create", verifyToken, idCardController.create);

    // Retrieve current user id_card with id
    router.get("/list/:id", verifyToken, idCardController.findOne);

    // Retrieve all ribs of current user
    router.get("/list-all", verifyToken, idCardController.findAll);

    // Retrieve all ribs in database if admin
    router.get(
        "/get-all", 
        [
            verifyToken, 
            isAdmin
        ],
        idCardController.getAll
    );
    
    // Update a id_card with id
    router.put("/update/:id", verifyToken, idCardController.update);

    // Delete a id_card with id
    router.delete("/delete/:id", verifyToken, idCardController.delete);
      
    app.use('/.netlify/functions/api/id_card', router);
};