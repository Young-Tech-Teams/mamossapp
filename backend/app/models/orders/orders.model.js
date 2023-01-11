module.exports = (sequelize, Sequelize) => {
   const Order = sequelize.define("orders", {
      order_num: {
            type: Sequelize.INTEGER
      },
      price: {
            type: Sequelize.INTEGER
      },
      lastname: {
            type: Sequelize.STRING
      },
       firstname: {
           type: Sequelize.STRING
       },
       livreur: {
            type: Sequelize.STRING
       },
       date: {
           type: Sequelize.DATE
       }
   });
   return Order;
};