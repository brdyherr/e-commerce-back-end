require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME || "ecommerce_db", process.env.DB_USER || "root" , process.env.DB_PW || "BrownEllie!2018?", {
      host: process.env.JAWSDB_URL || 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
