module.exports = (sequelize, Sequelize) => {
   const Rib = sequelize.define("rib", {
      account_holder: {
          type: Sequelize.STRING
      },
       bank_name: {
           type: Sequelize.STRING
       },
       rib_num: {
           type: Sequelize.BIGINT
       },
       iban_num: {
           type: Sequelize.BIGINT
       },
       bic_code: {
           type: Sequelize.BIGINT
       }
   });
   return Rib;
};