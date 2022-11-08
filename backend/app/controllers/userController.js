const config = require("../config/auth.config.js");
const db = require("../models");
const Op = db.Sequelize.Op;
const { user: User, refreshToken: RefreshToken } = db;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

/**
* @description Test user private content with JWT auth
* @param req
* @param res
*/
exports.userBoard = (req, res) => {
   res.status(200).send("User Content.");
};

/** REGISTER **/
module.exports.signup = async (req, res, next) => {
   User.create({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(data => {
    res.send(data);
  })
   .catch(err => {
      res.status(500).send({ message: err.message });
   });
};

/** LOGIN **/
module.exports.login = async (req, res, next) => {
   User.findOne({
      where: {
          email: req.body.email
      }
  })
   .then(async (user) => {
      if (!user) {
           return res.status(404).send({ message: "We didn't find you, sorry." });
      }
      const passwordIsValid = bcrypt.compareSync(
         req.body.password,
         user.password
      );
      if (!passwordIsValid) {
         return res.status(401).send({
            accessToken: null,
            message: "Invalid password, retry."
         });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
         expiresIn: config.jwtExpiration
      });
      let refreshToken = await RefreshToken.createToken(user);
         res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token,
            refreshToken: refreshToken,
            message: 'Successfully logged in !'
         });
      })
      .catch(err => {
         res.status(500).send({ message: err.message });
      });
};

/** LOGOUT **/
module.exports.logout = (req, res) => {
   try {
       RefreshToken.destroy({ where: { userId: req.userId } });

       res.status(200).json({
           message: "Successfully logged out !",
       });
       return;
   } catch (err) {
       return res.status(500).send({ message: err });
   }
};

/** TOKEN REFRESH **/
module.exports.refreshToken = async (req, res) => {
   const { refreshToken: requestToken } = req.body;
   if (requestToken == null) {
       return res.status(403).json({ message: "Refresh Token is required!" });
   }
   try {
       let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
       console.log(refreshToken)
       if (!refreshToken) {
           res.status(403).json({ message: "Refresh token is not in database!" });
           return;
       }
       if (RefreshToken.verifyExpiration(refreshToken)) {
           RefreshToken.destroy({ where: { id: refreshToken.id } });

           res.status(403).json({
               message: "Refresh token was expired. Please make a new signin request",
           });
           return;
       }
       const user = await refreshToken.getUser();
       let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
           expiresIn: 86400, // 24 hours
       });
       return res.status(200).json({
           accessToken: newAccessToken,
           refreshToken: refreshToken.token,
       });
   } catch (err) {
       return res.status(500).send({ message: err });
   }
};

/** GET INFOS **/
module.exports.getUserInfos = (req, res) => {
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
}