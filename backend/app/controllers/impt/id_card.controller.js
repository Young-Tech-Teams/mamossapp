const db = require("../../models");
const IdCard = db.id_card;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new id_card for current user
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
        id_card_num: req.body.id_card_num,
        nationality: req.body.nationality,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        dob: req.body.dob,
        city: req.body.city,
        userId: userId
    };
    IdCard.create(dataList)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Some error occurred while creating the id_card"
       });
   });
};

/**
* @description Find current user id_card by the specified id in the request
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
   IdCard.findByPk(id)
   .then(data => {
       if (data) {
           res.status(200).send(data);
       } else {
           res.status(403).send({
               message: `There has been an error retrieving id_card with id=${id}.`
           });
           return;
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error retrieving id_card with id=" + id
       });
   });
};

/**
* @description Find all id_cards of current user
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
    IdCard.findAll({ where: { userId : userId } })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the id_cards"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the id_cards"
        });
    });
 };

/**
* @description Get all id_cards in database if admin
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
    IdCard.findAll()
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the id_cards"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the id_cards"
        });
    });
 };


/**
* @description Update current user id_card by the specified id in the request
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
    IdCard.update(req.body, { where: { id: id } })
    .then(data => {
        res.status(200).send({ message: "The id_card has been updated successfully" });
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the IdCard."
        });
    });
};

/**
* @description Delete an id_card by the specified id in the request
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
    IdCard.destroy({ where: { id: id } })
    .then((success) => {
      if (!success) {
        res.status(403).send({
           message: `There has been an error deleting the id_card with id=${id}.`
        });
        } else {
            res.status(200).send({
                message: `id_card with id=${id} has been successfully deleted!`
            });
        }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || `There has been an error deleting the id_card with id=${id}.`
       });
   });
};