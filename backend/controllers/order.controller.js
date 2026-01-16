const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order with optional clientId and items
exports.create = async (req, res) => {
  try {
    const { clientId, instrument, receivedDate, problemDescription, status, photo, itemIds } = req.body;

    if (!instrument) { // Solo instrument es obligatorio
      return res.status(400).send({ message: "Instrument is required!" });
    }

    // Create the Order
    const order = await Order.create({
      clientId: clientId || null, // puede ser null
      instrument,
      receivedDate: receivedDate || new Date(),
      problemDescription,
      status: status || 'Pending',
      photo
    });

    // Associate items if provided
    if (itemIds && Array.isArray(itemIds) && itemIds.length > 0) {
      await order.setItems(itemIds); // Reemplaza todos los items
    }

    // Retrieve the order with client and items for response
    const orderWithRelations = await Order.findByPk(order.id, {
      include: [
        { model: db.client, as: "client" },
        { model: db.item, as: "items" }
      ]
    });

    res.send(orderWithRelations);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the order."
    });
  }
};

// Retrieve all Orders with client and items
exports.findAll = (req, res) => {
  Order.findAll({
    include: [
      { model: db.client, as: "client" },
      { model: db.item, as: "items" }
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders."
    }));
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id, {
    include: [
      { model: db.client, as: "client" },
      { model: db.item, as: "items" }
    ]
  })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Cannot find Order with id=${id}.` });
    })
    .catch(err => res.status(500).send({
      message: "Error retrieving Order with id=" + id
    }));
};

// Update an Order by the id in the request (and optionally its items)
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const { clientId, itemIds, ...orderFields } = req.body;

    // Permitir que clientId sea null
    if (clientId !== undefined) orderFields.clientId = clientId || null;

    // Update order fields
    const [num] = await Order.update(orderFields, { where: { id } });

    if (num !== 1) {
      return res.send({
        message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
      });
    }

    const order = await Order.findByPk(id);

    // Update items if provided
    if (itemIds && Array.isArray(itemIds)) {
      await order.setItems(itemIds); // si itemIds=[] se borran todos
    }

    // Return updated order with relations
    const updatedOrder = await Order.findByPk(id, {
      include: [
        { model: db.client, as: "client" },
        { model: db.item, as: "items" }
      ]
    });

    res.send(updatedOrder);
  } catch (err) {
    res.status(500).send({ message: "Error updating Order with id=" + id });
  }
};

// Delete an Order with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "Order was deleted successfully!" });
      else res.send({ message: `Cannot delete Order with id=${id}. Maybe Order was not found!` });
    })
    .catch(err => res.status(500).send({ message: "Could not delete Order with id=" + id }));
};

// Assign items to an existing order (from the view/inventory)
exports.addItemsToOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds)) {
      return res.status(400).send({ message: "itemIds array is required" });
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).send({ message: "Order not found" });

    await order.setItems(itemIds); // Reemplaza todos los items

    const updatedOrder = await Order.findByPk(orderId, {
      include: [
        { model: db.client, as: "client" },
        { model: db.item, as: "items" }
      ]
    });

    res.send(updatedOrder);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error assigning items to order" });
  }
};

