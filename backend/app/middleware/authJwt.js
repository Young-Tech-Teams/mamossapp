const database = require("../models");
const { user: User, role: Role } = database;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.status(401).send({ message: "Unauthorized Access : Token has expired!" });
	}
	return res.status(401).send({ message: "Unauthorized access : Token is invalid!" });
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
		req.user_id = decoded.id;
		next();
	});
};

const verifyEmail = (req, res, next) => {
	User.findOne({ where: { email : req.body.email } })
	.then(user => {
		if (user) {
			res.status(400).send({ message: `Email « ${user.email} » is already in use, please try again.` });
			return;
		}
		next();
	})
};

const checkRolesExisting = (req, res, next) => {
	if (req.body.roles) {
		 for (let i = 0; i < req.body.roles.length; i++) {
			  if (!ROLES.includes(req.body.roles[i])) {
					res.status(400).send({
						 message: "Failed! Role does not exist = " + req.body.roles[i]
					});
					return;
			  }
		 }
	}
	next();
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
	verifyEmail: verifyEmail,
	isAdmin: isAdmin,
	isClient: isClient,
	checkRolesExisting: checkRolesExisting
};

module.exports = authJwt;