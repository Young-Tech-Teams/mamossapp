const db = require("../models");
const Op = db.Sequelize.Op;
const Resume = db.resume;
const _ = require('lodash');
const { isArray } = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
   if (err instanceof TokenExpiredError) {
       return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
   }
   return res.sendStatus(401).send({ message: "Unauthorized!" });
}

/**
 * @description Create and save resume
 * @param req 
 * @param res 
 */
module.exports.createResume = async (req, res) => {
   await Resume.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      title: req.body.title,
      location: req.body.location,
      linkedin: req.body.linkedin,
      github: req.body.github,
      company: req.body.companyName,
      certificate: req.body.certificate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      overview: req.body.overview,
      link: req.body.deployLink,
      facility: req.body.facility,
      skill: req.body.skill,
      hobbies: req.body.hobbies,
   })
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the resume." });
   });
};

/**
 * @description Retrieve all resumes from the database
 * @param req 
 * @param res 
 */
module.exports.findAll = async (req, res) => {
   await Resume.findAll({})
   .then(data => {
      res.send(data);
   })
   .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving the resumes." });
   });
}

/**
 * @description Find a resume with id in request
 * @param req 
 * @param res 
 */
module.exports.findOne = async (req, res) => {
   const id = req.params.id;
   await Resume.findByPk(id, {})
      .then(data => {
         if (data) {
            res.send(data);
         } else {
            res.status(404).send({
               message: `Couldn't find the resume with id=${id}.`
            });
         }
      })
      .catch(err => {
         res.status(500).send({
            message: "There has been an error while retrieving the resume with id=" + id
         });
      });
};


/**
 * @description Update a resume by the id in request
 * @param req 
 * @param res 
 */
module.exports.update = (req, res) => {
   const id = req.params.id;
   Resume.update(req.body, {
      where: { id: id }
   })
   .then(nb => {
      if (nb == 1) {
         res.send({
            message: "Resume was updated successfully."
         });
      } else {
         res.send({
            message: `Update of resume with id=${id} failed.`
         });
      }
   })
   .catch(err => {
      res.status(500).send({
         message: "There has been an error while updating the resume with id=" +id
      });
   });
};


/**
 * @description Delete a resume by the id in request
 * @param req 
 * @param res 
 */
module.exports.delete = (req, res) => {
   const id = req.params.id;
   Resume.destroy({
      where: { id: id }
   })
   .then(nb => {
      if (nb == 1) {
         res.send({
            message: "Resume was deleted successfully."
         });
      } else {
         res.send({
            message: `Suppression of resume with id=${id} failed.`
         });
      }
   })
   .catch(err => {
      res.status(500).send({
         message: "There has been an error while removing the resume with id=" +id
      });
   });
};


/**
 * @description Delete all resumes
 * @param req 
 * @param res 
 */
module.exports.deleteAll = (req, res) => {
   Resume.destroy({
      where: {},
      truncate: false
   })
   .then(nb => {
      res.send({ message: `${nb} resumes were deleted successfully!` });
  })
  .catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while removing all resumes."
      });
  });
};
