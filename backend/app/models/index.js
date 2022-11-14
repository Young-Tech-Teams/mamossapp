const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("./user/refreshToken.model.js")(sequelize, Sequelize);
db.role = require("./user/role.model.js")(sequelize, Sequelize);

/** ROLES */
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["client", "admin"];

/** TOKEN */
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id"
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id"
});


module.exports = db;