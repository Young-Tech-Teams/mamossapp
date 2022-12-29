const db = require("../../models");
const Order = db.order;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../../config/auth.config.js");

/**
* @description Create and save a new order for current user
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
       order_num: req.body.order_num,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        date: req.body.date,
        userId: userId
    };
    Order.create(dataList)
    .then(data => {
       res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Some error occurred while creating the order"
       });
   });
};

/**
* @description Find current user order by the specified id in the request
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
   Order.findByPk(id)
   .then(data => {
       if (data) {
           res.status(200).send(data);
       } else {
           res.status(403).send({
               message: `There has been an error retrieving order with id=${id}.`
           });
           return;
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error retrieving order with id=" + id
       });
   });
};

/**
* @description Find all orders of current user
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
    Order.findAll({ where: { userId : userId } })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the orders"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the orders"
        });
    });
 };

/**
* @description Get all orders in database if admin
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
    Order.findAll()
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(403).send({
                message: "There has been an error retrieving all the orders"
            });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all the orders"
        });
    });
 };


/**
* @description Update current user order by the specified id in the request
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
    Order.update(req.body, { where: { id: id } })
    .then(data => {
        res.status(200).send({ message: "The order has been updated successfully" });
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error updating the Order."
        });
    });
};

/**
* @description Delete an order by the specified id in the request
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
    Order.destroy({ where: { id: id } })
    .then((success) => {
      if (!success) {
        res.status(403).send({
           message: `There has been an error deleting the order with id=${id}.`
        });
        } else {
            res.status(200).send({
                message: `order with id=${id} has been successfully deleted!`
            });
        }
   })
   .catch(err => {
       res.status(500).send({
           message: 
           err.message || `There has been an error deleting the order with id=${id}.`
       });
   });
};