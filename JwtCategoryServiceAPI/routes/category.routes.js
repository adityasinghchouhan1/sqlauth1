// File: routes/category.routes.js
const router = require('express').Router()
const { Category, Service } = require('../models')

router.post('/', async (req, res) => {
  const { name } = req.body
  const category = await Category.create({ name })
  res.json(category)
})

router.get('/', async (req, res) => {
  const categories = await Category.findAll()
  res.json(categories)
})

router.put('/:categoryId', async (req, res) => {
  const { name } = req.body
  await Category.update({ name }, { where: { id: req.params.categoryId } })
  res.json({ message: 'Category updated' })
})

router.delete('/:categoryId', async (req, res) => {
  const services = await Service.findAll({
    where: { categoryId: req.params.categoryId },
  })
  if (services.length)
    return res.status(400).json({ message: 'Category is not empty' })
  await Category.destroy({ where: { id: req.params.categoryId } })
  res.json({ message: 'Category deleted' })
})

module.exports = router
