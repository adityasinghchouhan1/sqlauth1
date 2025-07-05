// File: routes/service.routes.js
const router = require('express').Router()
const { Service, PriceOption } = require('../models')

router.post('/:categoryId/service', async (req, res) => {
  const { name, type, priceOptions } = req.body
  const service = await Service.create({
    name,
    type,
    categoryId: req.params.categoryId,
  })
  if (priceOptions?.length) {
    for (const opt of priceOptions) {
      await PriceOption.create({ ...opt, serviceId: service.id })
    }
  }
  res.json(service)
})

router.get('/:categoryId/services', async (req, res) => {
  const services = await Service.findAll({
    where: { categoryId: req.params.categoryId },
    include: PriceOption,
  })
  res.json(services)
})

router.put('/:categoryId/service/:serviceId', async (req, res) => {
  const { name, type, priceOptions } = req.body
  await Service.update({ name, type }, { where: { id: req.params.serviceId } })
  await PriceOption.destroy({ where: { serviceId: req.params.serviceId } })
  if (priceOptions?.length) {
    for (const opt of priceOptions) {
      await PriceOption.create({ ...opt, serviceId: req.params.serviceId })
    }
  }
  res.json({ message: 'Service updated' })
})

router.delete('/:categoryId/service/:serviceId', async (req, res) => {
  await PriceOption.destroy({ where: { serviceId: req.params.serviceId } })
  await Service.destroy({ where: { id: req.params.serviceId } })
  res.json({ message: 'Service deleted' })
})

module.exports = router
