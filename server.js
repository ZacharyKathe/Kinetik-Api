const express = require("express");
const session = require('express-session');
const routes = require('./routes');
const logger = require("morgan");
const cors = require("cors")
require("dotenv").config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const { getMaxListeners } = require("./models/User");

const PORT = process.env.PORT || 3002;

const app = express();

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

app.use(cors());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

