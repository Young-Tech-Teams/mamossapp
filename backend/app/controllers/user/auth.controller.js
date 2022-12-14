const config = require("../../config/auth.config.js");
const db = require("../../models");
const Op = db.Sequelize.Op;
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

/** REGISTER **/
/**
 * @description Register a new user
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = async (req, res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if (req.body.roles === 1) {
            user.update({ roleId: 1 });
            res.send({ message: "User was registered successfully as admin!" });
        } else if (req.body.roles === 2) {
            user.update({ roleId: 2 });
            res.send({ message: "User was registered successfully as client!" });
        } else if (req.body.roles === 3) {
            user.update({ roleId: 3 });
            res.send({ message: "User was registered successfully as livreur!" });
        } else {
            user.update({ roleId: 2 })
            res.send({ message: "User was registered successfully!" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/** LOGIN **/
/**
 * @ description Log in a user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res, next) => {
   User.findOne({ where: { email: req.body.email } })
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
                message: "Invalid password, retry please."
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
                message: 'Successfully logged in!'
            });
        })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/** LOGOUT **/
/**
 * @description Log out the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.logout = (req, res) => {
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
/**
 * @description Refresh access-token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.refreshToken = async (req, res) => {
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
               message: "Refresh token has expired. Please make a new signin request",
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
