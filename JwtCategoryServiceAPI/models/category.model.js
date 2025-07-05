// File: models/category.model.js
const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  return sequelize.define('Category', {
    name: DataTypes.STRING,
  })
}
