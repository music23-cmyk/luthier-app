module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", orders.create);

  // Retrieve all Orders
  router.get("/", orders.findAll);

  // Retrieve a single Order with id
  router.get("/:id", orders.findOne);

  // Update a Order with id
  router.put("/:id", orders.update);

  // Delete a Order with id
  router.delete("/:id", orders.delete);

  //Add items to new order
  router.post("/:id/items", orders.addItemsToOrder); 
  
  // Add to item to order
  router.put("/:id/items", orders.addItemsToOrder);

  app.use('/api/orders', router);
};