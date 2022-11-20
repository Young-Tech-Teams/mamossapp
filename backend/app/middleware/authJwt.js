const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.status(401).send({ message: "Unauthorized Access! Token has expired!" });
	}
	return res.sendStatus(401).send({ message: "Unauthorized access!" });
}

const verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];
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
		next();
	});
};

const isAdmin = (req, res, next) => {
	User.findByPk(req.userId, { include: Role }).then(user => {
		if (user.role.name === "admin") {
			next();
			return;
		} else {
			res.status(403).send({
				message: "Admin role is required for this operation!"
			});
			return;
		}
	});
};

const isClient = (req, res, next) => {
	User.findByPk(req.userId, { include: Role }).then(user => {
		if (user.role.name === "client") {
			next();
			return;
		} else {
			res.status(403).send({
				message: "Client role is required for this operation!"
			});
			return;
		}
	});
};

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isClient: isClient
};

module.exports = authJwt;