const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//si añado otra tabla, se añade otra debajo db.otratabla
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);
db.client = require("./client.model.js")(sequelize, Sequelize);

// Relaciones
db.client.hasMany(db.orders, { foreignKey: "clientId", as: "orders" });
db.orders.belongsTo(db.client, { foreignKey: "clientId", as: "client" });

db.orders.belongsToMany(db.item, { through: "OrderItems", as: "items", foreignKey: "orderId" });
db.item.belongsToMany(db.orders, { through: "OrderItems", as: "orders", foreignKey: "itemId" });

module.exports = db;