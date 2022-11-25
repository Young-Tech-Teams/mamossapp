const db = require("../../models");
const Address = db.address;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new address for current user
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
* @description Find current user address by the specified id in the request
* @param req
* @param res
*/
exports.findOne = (req, res) => {
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
   Address.findByPk(id)
   .then(data => {
       if (data) {
           res.status(200).send(data);
       } else {
           res.status(403).send({
               message: `There has been an error retrieving address with id=${id}.`
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
* @description Find all addresses of current user
* @param req
* @param res
*/
exports.findAll = (req, res) => {
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
    Address.findAll({ where: { userId : userId } })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the addresses"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the addresses"
        });
    });
 };

/**
* @description Get all addresses in database if admin
* @param req
* @param res
*/
exports.getAll = (req, res) => {
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
    Address.findAll()
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the addresses"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the addresses"
        });
    });
 };


/**
* @description Update current user address by the specified id in the request
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
        res.status(200).send({ message: "The address has been updated successfully" });
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the address."
        });
    });
};

/**
* @description Delete an address by the specified id in the request
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