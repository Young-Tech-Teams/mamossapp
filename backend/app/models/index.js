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
db.address = require("./address/address.model.js")(sequelize, Sequelize);
db.payment = require("./payment/credit_card.model.js")(sequelize, Sequelize);

/** TOKEN */
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id"
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id"
});

/** ROLES */
db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.ROLES = ["client", "livreur", "admin"];

// db.role.belongsToMany(db.user, {
  //   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });
ee

/** ADDRESS */
db.user.hasMany(db.address, { as: "addresses" });
db.address.belongsTo(db.user, { as: "user" });

/** PAYMENT */
db.user.hasMany(db.payment, { as: "credit_cards" });
db.payment.belongsTo(db.user, { as: "user" });

module.exports = db;