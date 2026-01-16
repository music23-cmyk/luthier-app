const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name is required!" });
    return;
  }

  const item = {
    name: req.body.name,
    quantity: req.body.quantity || 0,
    description: req.body.description
  };

  Item.create(item)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating item" }));
};

// FindAll
exports.findAll = (req, res) => {
  Item.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving items" }));
};

// FindOne
exports.findOne = (req, res) => {
  const id = req.params.id;
  Item.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Item with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving item with id=" + id }));
};

// Update
exports.update = (req, res) => {
  const id = req.params.id;
  Item.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Item updated successfully" });
      else res.send({ message: `Cannot update item id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating item id=" + id }));
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Item.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Item deleted successfully" });
      else res.send({ message: `Cannot delete item id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Could not delete item id=" + id }));
};