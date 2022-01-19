const express = require('express')
const router = express.Router()
import { getMetricsFromLib, sendMeasures } from "../controllers/analytics"

app.post('/metrics', getMetricsFromLib)
app.get('/measures', sendMeasures)

module.exports = router