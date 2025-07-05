// File: models/service.model.js
const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  return sequelize.define('Service', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('Normal', 'VIP'),
    categoryId: DataTypes.INTEGER,
  })
}
