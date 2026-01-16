module.exports = (sequelize, Sequelize) => {
  const Bicycle = sequelize.define("bicycle", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    }
  });

  return Bicycle;
};