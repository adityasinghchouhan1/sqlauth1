// File: models/user.model.js
const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  return sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  })
}
