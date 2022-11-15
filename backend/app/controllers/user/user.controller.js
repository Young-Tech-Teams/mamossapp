const config = require("../../config/auth.config.js");
const db = require("../../models");
const Op = db.Sequelize.Op;
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.sendStatus(401).send({ message: "Unauthorized access, JWT Token has expired." });
    }
    return res.sendStatus(401).send({ message: "Unauthorized access! "})
}

/******* PRIVATE CONTENT *******/
/**
* @description Test USER private content with JWT auth
* @param {*} req
* @param {*} res
*/
exports.userBoard = (req, res) => {
   res.status(200).send("User's private content working!.");
};

/**
 * @description Test ADMIN private content with JWT auth
 * @param {*} req 
 * @param {*} res 
 */
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin's private content working!")
}

/** GET INFOS **/
/**
 * @description Get user information with JWT
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUserInfos = (req, res) => {
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
   User.findOne({
      where: {
         id: userId
      }
   })
   .then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while retrieving user"
        })
    })
}

/** TEST GET ALL USERS INFOS **/
/**
 * @description Returns all users informations FOR ADMIN ONLY
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 exports.findAllUsers  = async (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err) => {
        if (err) {
            return catchError(err, res);
        }
    });
    User.findAll({})
    .then(data => {
       res.send(data);
    })
    .catch(err => {
       res.status(500).send({ message: err.message || "Some error occurred while retrieving all users." });
    });
 }

