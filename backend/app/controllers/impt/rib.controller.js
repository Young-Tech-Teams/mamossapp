const db = require("../../models");
const Rib = db.rib;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new rib for current user
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
        account_holder: req.body.account_holder,
        bank_name: req.body.bank_name,
        rib_num: req.body.rib_num,
        iban_num: req.body.iban_num,
        bic_code: req.body.bic_code,
        userId: userId
    };
    Rib.create(dataList)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Some error occurred while creating the rib"
       });
   });
};

/**
* @description Find current user rib by the specified id in the request
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
   Rib.findByPk(id)
   .then(data => {
       if (data) {
           res.status(200).send(data);
       } else {
           res.status(403).send({
               message: `There has been an error retrieving rib with id=${id}.`
           });
           return;
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error retrieving rib with id=" + id
       });
   });
};

/**
* @description Find all ribs of current user
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
    Rib.findAll({ where: { userId : userId } })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the ribs"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the ribs"
        });
    });
 };

/**
* @description Get all ribs in database if admin
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
    Rib.findAll()
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the ribs"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the ribs"
        });
    });
 };


/**
* @description Update current user rib by the specified id in the request
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
    Rib.update(req.body, { where: { id: id } })
    .then(data => {
        res.status(200).send({ message: "The rib has been updated successfully" });
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the Rib."
        });
    });
};

/**
* @description Delete an rib by the specified id in the request
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
    Rib.destroy({ where: { id: id } })
    .then((success) => {
      if (!success) {
        res.status(403).send({
           message: `There has been an error deleting the rib with id=${id}.`
        });
        } else {
            res.status(200).send({
                message: `rib with id=${id} has been successfully deleted!`
            });
        }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || `There has been an error deleting the rib with id=${id}.`
       });
   });
};