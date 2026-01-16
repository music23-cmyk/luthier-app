module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    surname: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      validate: { 
        notEmpty: true,
        isEmail: true
      }
    }
  });

  return Client;
};
