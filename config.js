require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080 || 8090,

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB,
  },

  router: require("express").Router(),
};
