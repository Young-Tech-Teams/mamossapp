module.exports = (sequelize, Sequelize) => {
   const Rib = sequelize.define("rib", {
      account_holder: {
          type: Sequelize.STRING
      },
       bank_name: {
           type: Sequelize.STRING
       },
       rib_num: {
           type: Sequelize.STRING
       },
       iban_num: {
           type: Sequelize.STRING
       },
       bic_code: {
           type: Sequelize.STRING
       }
   });
   return Rib;
};