module.exports = (sequelize, Sequelize) => {
   const Payment = sequelize.define("payment", {
      lastname: {
          type: Sequelize.STRING
      },
       firstname: {
           type: Sequelize.STRING
       },
       card_number: {
           type: Sequelize.BIGINT
       },
       card_exp_date: {
           type: Sequelize.DATE
       },
       card_crypto: {
           type: Sequelize.INTEGER
       }
   });
   return Payment;
};