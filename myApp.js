const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const nameRouter = require('./routes/nameRouter');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('mongo connected')

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })


// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path} - ${req.ip}`)
//     next()
// })

app.use(bodyParser.urlencoded({extended: false}))

// const staticPath = __dirname + '/public'
    
// app.use('/public', express.static(staticPath));



app.get('/', (req, res) => {
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
})

app.get('/json', (req, res) => {
  const message = (process.env.MESSAGE_STYLE === 'uppercase')
    ? 'HELLO JSON'
    : 'Hello json';
  res.json({ message });
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next()
}, (req, res) => {
    res.json({
        time: req.time
    })
})

app.get('/:word/echo', (req, res) => {
    res.json({
        echo: req.params.word
    })
})


app.use('/name', nameRouter)

module.exports = app;
