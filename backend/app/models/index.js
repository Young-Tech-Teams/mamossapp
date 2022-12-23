const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: require('mysql2'),
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true
  },
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
db.payment = require("./payment/payment.model.js")(sequelize, Sequelize);
db.rib = require("./impt/rib.model.js")(sequelize, Sequelize);
db.id_card = require("./impt/id_card.model.js")(sequelize, Sequelize);

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

/** ADDRESS */
db.user.hasMany(db.address, { as: "addresses" });
db.address.belongsTo(db.user, { as: "user" });

/** PAYMENT */
db.user.hasMany(db.payment, { as: "payments" });
db.payment.belongsTo(db.user, { as: "user" });

/** RIB */
db.user.hasMany(db.rib, { as: "ribs" });
db.rib.belongsTo(db.user, { as: "user" });

/** ID CARD */
db.user.hasOne(db.id_card, { as: "id_cards" });
db.id_card.belongsTo(db.user, { as: "user" });

module.exports = db;