const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        name: `${req.query.first} ${req.query.last  }`
    })
})

router.post('/', (req, res) => {
    res.json({
        name: `${req.body.first} ${req.body.last  }`
    })
})

module.exports = router