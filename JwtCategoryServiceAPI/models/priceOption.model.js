// File: models/priceOption.model.js
const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  return sequelize.define('PriceOption', {
    duration: DataTypes.STRING,
    price: DataTypes.FLOAT,
    type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
    serviceId: DataTypes.INTEGER,
  })
}
