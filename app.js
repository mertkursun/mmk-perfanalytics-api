const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
var cors = require('cors')
app.use(cors());
app.use(express.json());
const analyticsRoute = require('./routes/analytics');
app.use('/analytics', analyticsRoute)


// Connect to DB
mongoose.connect('mongodb+srv://mmkursun:mmk-1907@cluster0.bbpjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch((error) => {
    console.error('Could not connect to the database. Error : ', error)
    process.exit()
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`) );

