require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const analyticsRoute = require('./routes/analytics');
const corsOptions = { origin: "*", optionsSuccessStatus: 200 };
const PORT = process.env.PORT || 5000
const HOST = process.env.PORT === 5000 ? `http://localhost:${PORT}` : "https://mmk-perf-api.herokuapp.com/";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${HOST}`)
	mongoose.connect(
		process.env.DB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
	).then(() => {
		console.log('DB connected')
	}).catch((error) => {
		console.error('DB error', error)
		process.exit()
	})
	analyticsRoute(app)
});