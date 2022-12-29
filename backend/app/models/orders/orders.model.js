module.exports = (sequelize, Sequelize) => {
   const Order = sequelize.define("orders", {
      order_num: {
         type: Sequelize.INTEGER
      },
      lastname: {
          type: Sequelize.STRING
      },
       firstname: {
           type: Sequelize.STRING
       },
       date: {
           type: Sequelize.DATE
       }
   });
   return Order;
};