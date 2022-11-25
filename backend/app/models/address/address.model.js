module.exports = (sequelize, Sequelize) => {
   const Address = sequelize.define("adresses", {
       name: {
           type: Sequelize.STRING
       },
       street: {
           type: Sequelize.STRING
       },
       street_num: {
           type: Sequelize.INTEGER
       },
       floor: {
           type: Sequelize.STRING
       },
       door: {
           type: Sequelize.INTEGER
       },
       building: {
           type: Sequelize.STRING
       },
       code: {
           type: Sequelize.INTEGER
       },
       zip_code: {
           type: Sequelize.INTEGER
       },
       city: {
           type: Sequelize.STRING
       },
       title: {
           type: Sequelize.STRING
       }
   });
   return Address;
};