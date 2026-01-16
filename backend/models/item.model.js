module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });

  return Item;
};