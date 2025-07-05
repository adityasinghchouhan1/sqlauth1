// File: models/index.js
require('dotenv').config() // ✅ Load .env variables first
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: false, // optional
})
const User = require('./user.model')(sequelize)
const Category = require('./category.model')(sequelize)
const Service = require('./service.model')(sequelize)
const PriceOption = require('./priceOption.model')(sequelize)

// Define relations
Category.hasMany(Service, { foreignKey: 'categoryId', onDelete: 'CASCADE' })
Service.belongsTo(Category, { foreignKey: 'categoryId' })

Service.hasMany(PriceOption, { foreignKey: 'serviceId', onDelete: 'CASCADE' })
PriceOption.belongsTo(Service, { foreignKey: 'serviceId' })

module.exports = { sequelize, User, Category, Service, PriceOption }
