module.exports = (sequelize, Sequelize) => {
   const IdCard = sequelize.define("id_card", {
      id_card_num: {
         type: Sequelize.BIGINT
      },
      nationality: {
         type: Sequelize.STRING
      },
      lastname: {
         type: Sequelize.STRING
      },
      firstname: {
         type: Sequelize.STRING
      },
      gender: {
         type: Sequelize.STRING
      },
      dob: {
         type: Sequelize.DATE
      },
      city: {
         type: Sequelize.STRING
      }
   });
   return IdCard;
}