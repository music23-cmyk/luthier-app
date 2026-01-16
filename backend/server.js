const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8100"
};
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// Normal use. Doesn't delete the database data
// db.sequelize.sync();

/*
// In development, you may need to drop existing tables and re-sync database
*/
/*
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db. (force: true → tablas recreadas desde cero)");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });*/
// Doesn't delete the database data

db.sequelize.sync({ force: true });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to myApp." });
});

require("./routes/order.routes")(app);
require("./routes/item.routes")(app);
require("./routes/client.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});