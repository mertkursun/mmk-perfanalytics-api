require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const analyticsRouter = require('./routes/analytics')
app.use('/analytics', analyticsRouter)

app.listen(process.env.PORT || 8080, () => console.log('Server Started'))