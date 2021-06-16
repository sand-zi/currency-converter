const express = require('express')
const {getOptions, getCurrency} = require('./currency.controller')
const router = express.Router()

router.get('/options', getOptions)
router.get('/rate',  getCurrency)


module.exports = router