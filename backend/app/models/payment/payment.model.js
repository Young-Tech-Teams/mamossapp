module.exports = (sequelize, Sequelize) => {
   const Payment = sequelize.define("credit_cards", {
      lastname: {
          type: Sequelize.STRING
      },
       firstname: {
           type: Sequelize.STRING
       },
       number: {
           type: Sequelize.BIGINT
       },
       expiration_date: {
           type: Sequelize.STRING
       },
       crypto: {
           type: Sequelize.INTEGER
       }
   });
   return Payment;
};