const db = require("../../models");
const Address = db.address;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new adress
* @param req
* @param res
*/
exports.create = (req, res) => {
   let token = req.headers["x-access-token"];
   var userId;
    if (!token) {
        return res.status(403).send({
            message: "Access token is required for this operation to work."
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        userId = decoded.id;
    });
    // Create an adress
    const dataList = {
        name: req.body.name,
        street: req.body.street,
        street_num: req.body.street_num,
        floor: req.body.floor,
        door: req.body.door,
        building: req.body.building,
        code: req.body.code,
        zip_code: req.body.zip_code,
        city: req.body.city,
        country: req.body.country,
        userId: userId
    };
    // Save adress in the database
    Address.create(dataList)
   .then(data => {
       res.send(data);
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || "Some error occurred while creating the address"
       });
   });
};

/**
* @description Find a single adress with an id
* @param req
* @param res
*/
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     Adress.findByPk(id)
//         .then(data => {
//             if (data) {
//                 res.send(data);
//             } else {
//                 res.status(404).send({
//                     message: `Cannot find adress with id=${id}.`
//                 });
//                 return;
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving adress with id=" + id
//             });
//         });
// };
/**
* @description Update an adress by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
   let token = req.headers["x-access-token"];
   var userId;
   if (!token) {
      return res.status(403).send({
          message: "Access token is required for this operation to work."
      });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
          return catchError(err, res);
      }
      req.userId = decoded.id;
      userId = decoded.id;
  });
  User.findByPk(userId, { include: Address })
  .then(addressRecord => {
      if (!addressRecord) {
         throw new Error("Address records could not be found");
      } else {
         console.log(`Retrieved address records ${JSON.stringify(addressRecord, null, 2)}`);

         Address.update(req.body, { where: { id: userId } })
         .then(updatedRecord => {
            console.log(`Updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            res.status(200).send({ message: updatedRecord })
         })
         .catch(err => {
            res.status(500).send({
               message: "There was an error getting the updated address."
            });
         });
      }
   })
   .catch(err => {
      res.status(500).send({
         message: "There was an error updating the address."
      });
   });
};

/**
* @description Delete an adress with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
   let token = req.headers["x-access-token"];
   var userId;
   if (!token) {
       return res.status(403).send({
           message: "Access token is required for this operation to work.",
       });
   }
   jwt.verify(token, config.secret, (err, decoded) => {
       if (err) {
           return catchError(err, res);
       }
       req.userId = decoded.id;
       userId = decoded.id;
   });
    Adress.destroy({ where: { id: id } }, [{ include: User }, { where: { id: userId }} ])
    .then((success) => {
      if (!success) {
           res.send({
               message: "Your address was deleted successfully!"
           });
       } else {
           res.send({
               message: `Cannot delete address with id=${id}. Maybe adress was not found!`
           });
       }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || "Could not delete adress with id=" + id
       });
   });
};