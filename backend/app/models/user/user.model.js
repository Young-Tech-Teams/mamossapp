module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("users", {
       firstname: {
            type: Sequelize.STRING
       },
       lastname: {
            type: Sequelize.STRING
       },
       email: {
           type: Sequelize.STRING,
           unique: true,
           allowNull: false,
       },
       password: {
           type: Sequelize.STRING
       },
       age: {
            type: Sequelize.INTEGER
       },
       gender: {
            type: Sequelize.STRING
       },
       status: {
        type: Sequelize.STRING
       },
   });
   return User;
};