module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {   
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: true, // permite pedido sin cliente
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    receivedDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    problemDescription: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Repairing', 'Completed', 'Delivered'),
      allowNull: false,
      defaultValue: 'Pending'
    },
    instrument: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    photo: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null
    }
  });

  return Order;
};
