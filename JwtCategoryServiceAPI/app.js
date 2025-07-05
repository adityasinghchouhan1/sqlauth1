// File: app.js
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')
const categoryRoutes = require('./routes/category.routes')
const serviceRoutes = require('./routes/service.routes')
const { verifyToken } = require('./middleware/auth.middleware')
const { sequelize } = require('./models')
const cors = require('cors')

// Enable CORS

dotenv.config()
app.use(express.json())
app.use(cors())

app.use('/login', authRoutes)
app.use('/category', verifyToken, categoryRoutes)
app.use('/category', verifyToken, serviceRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  await sequelize.sync({ alter: true })
  console.log(`Server running on port ${PORT}`)
})
