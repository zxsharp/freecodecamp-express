const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const nameRouter = require('./routes/nameRouter');
const mongoose = require('mongoose')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));





app.get('/_api/is-mongoose-ok', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.json({ isMongooseOk: true });
    } else {
        res.json({ isMongooseOk: false });
    }
});


app.use('/name', nameRouter)

module.exports = app;
