const express = require("express");
const routes = require('./routes');
const logger = require("morgan");
const cors = require("cors")
require("dotenv").config();

const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3002;

const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

