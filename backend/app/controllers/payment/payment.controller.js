const db = require("../../models");
const Payment = db.payment;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new payment for current user
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

    const dataList = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        card_number: req.body.card_number,
        card_exp_date: req.body.card_exp_date,
        card_scrypto: req.body.card_crypto,
        userId: userId
    };
    Payment.create(dataList)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Some error occurred while creating the payment"
       });
   });
};

/**
* @description Find current user payment by the specified id in the request
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
   Payment.findByPk(id)
   .then(data => {
       if (data) {
           res.status(200).send(data);
       } else {
           res.status(403).send({
               message: `There has been an error retrieving payment with id=${id}.`
           });
           return;
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error retrieving payment with id=" + id
       });
   });
};

/**
* @description Find all payments of current user
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
    Payment.findAll({ where: { userId : userId } })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the payments"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the payments"
        });
    });
 };

/**
* @description Get all payments in database if admin
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
    Payment.findAll()
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the payments"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the payments"
        });
    });
 };


/**
* @description Update current user payment by the specified id in the request
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
    Payment.update(req.body, { where: { id: id } })
    .then(data => {
        res.status(200).send({ message: "The payment has been updated successfully" });
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the payment."
        });
    });
};

/**
* @description Delete an payment by the specified id in the request
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
    Payment.destroy({ where: { id: id } })
    .then((success) => {
      if (!success) {
        res.status(403).send({
           message: `There has been an error deleting the payment with id=${id}.`
        });
        } else {
            res.status(200).send({
                message: `Payment with id=${id} has been successfully deleted!`
            });
        }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || `There has been an error deleting the payment with id=${id}.`
       });
   });
};