const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Create a new client
exports.create = (req, res) => {
  if (!req.body.name || !req.body.surname || !req.body.email) {
    res.status(400).send({ message: "Name, surname and email are required!" });
    return;
  }

  const client = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email
  };

  Client.create(client)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating client" }));
};

// Retrieve all clients
exports.findAll = (req, res) => {
  Client.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving clients" }));
};

// Retrieve one client by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Client.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Client with id=${id} not found` });
    })
    .catch(err => res.status(500).send({ message: "Error retrieving client with id=" + id }));
};

// Update a client
exports.update = (req, res) => {
  const id = req.params.id;
  Client.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Client updated successfully" });
      else res.send({ message: `Cannot update client id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Error updating client id=" + id }));
};

// Delete a client
exports.delete = (req, res) => {
  const id = req.params.id;
  Client.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Client deleted successfully" });
      else res.send({ message: `Cannot delete client id=${id}` });
    })
    .catch(err => res.status(500).send({ message: "Could not delete client id=" + id }));
};
