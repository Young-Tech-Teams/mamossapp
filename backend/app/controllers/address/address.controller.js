const db = require("../../models");
const Address = db.address;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new address
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
    // Create an address
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
    Address.create(dataList)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Some error occurred while creating the address"
       });
   });
};

/**
* @description Find current user address
* @param req
* @param res
*/
exports.findAddress = (req, res) => {
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
   Address.findByPk(userId, { where: id })
   .then(data => {
       if (data) {
           res.send(data);
       } else {
           res.status(404).send({
               message: `There has been an error while trying to find address with id=${id}.`
           });
           return;
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error retrieving address with id=" + id
       });
   });
};
/**
* @description Update current user address
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
    const id = req.params.id;
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
    Address.update(dataList, { where: { id: id } })
    .then(data => {
        res.status(200).send({ message: "The address has been updated successfully" })
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the address."
        });
    });
};

/**
* @description Delete an address with the specified id in the request
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
    const id = req.params.id;
    Address.destroy({ where: { id: id } })
    .then((success) => {
      if (!success) {
        res.status(403).send({
           message: `There has been an error deleting the address with id=${id}.`
        });
        } else {
            res.status(200).send({
                message: `Address with id=${id} has been successfully deleted!`
            });
        }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || `There has been an error deleting the address with id=${id}.`
       });
   });
};