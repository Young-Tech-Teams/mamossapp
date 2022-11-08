module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("users", {
       email: {
           type: Sequelize.STRING,
           unique: true,
           allowNull: false,
       },
       password: {
           type: Sequelize.STRING
       },
       firstname: {
           type: Sequelize.STRING
       },
       lastname: {
           type: Sequelize.STRING
       },
   });
   return User;
};