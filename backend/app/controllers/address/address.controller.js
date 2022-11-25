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
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        userId = decoded.id;
    });
    // Validate request
    if (!req.body.adress || !req.body.city || !req.body.state_province || !req.body.postal_code || !req.body.country_code) {
        res.status(400).send({
            message: "All fields must be fulfilled !"
        });
        return;
    }
    // Create an adress
    const infos = {
        adress: req.body.adress,
        city: req.body.city,
        state_province: req.body.state_province,
        postal_code: req.body.postal_code,
        country_code: req.body.postal_code,
        title: req.body.title,
        userId: userId
    };
    // Save adress in the database
    Adress.create(infos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occurred while creating the adress"
            });
        });
};
/**
* @description Retrieve all adresses from the database
* @param req
* @param res
*/
exports.findAll = (req, res) => {
    const {userId} = req.query;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
    Adress.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving adresss."
            });
        });
};
/**
* @description Find a single adress with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const id = req.params.id;
    Adress.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find adress with id=${id}.`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving adress with id=" + id
            });
        });
};
/**
* @description Update an adress by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Adress.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Adress was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update adress with id=${id}. Maybe adress was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating adress with id=" + id
            });
        });
};
/**
* @description Delete an adress with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Adress.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Adress was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete adress with id=${id}. Maybe adress was not found!`
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