const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config()
const mongoose = require('mongoose');
var cors = require('cors')
const analyticsRoute = require('./routes/analytics');

mongoose.connect(
	'mongodb+srv://mmkursun:mmk-1907@cluster0.bbpjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true },
).then(() => {
    console.log('Successfully connected to the database')
}).catch((error) => {
    console.error('Could not connect to the database. Error : ', error)
    process.exit()
})

app.use(cors());
app.use(express.json());

app.use('/analytics', analyticsRoute)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));