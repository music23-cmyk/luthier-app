module.exports = app => {
  const items = require("../controllers/item.controller.js");

  const router = require("express").Router();

  router.post("/", items.create);
  router.get("/", items.findAll);
  router.get("/:id", items.findOne);
  router.put("/:id", items.update);
  router.delete("/:id", items.delete);

  app.use('/api/items', router);
};