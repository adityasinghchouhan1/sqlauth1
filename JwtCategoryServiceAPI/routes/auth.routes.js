// File: routes/auth.routes.js
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
  const { email, password } = req.body
  if (email === 'admin@codesfortomorrow.com' && password === 'Admin123!@#') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    return res.json({ token })
  }
  return res.status(401).json({ message: 'Invalid credentials' })
})

module.exports = router
