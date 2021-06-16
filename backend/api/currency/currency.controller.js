
const currencyService = require('./currency.service')

async function getOptions(req, res) {
    try {
        const options = await currencyService.getOptions()
        console.log('Am I getting to options in controller?')
        res.send(options)
    } catch (err) {
      
        res.status(500).send({ err: 'Failed to get options' })
    }
}


async function getCurrency(req, res) {
    try {

        const currency = await currencyService.query(req.query)
        console.log('currency from service', currency)
        res.send(currency)
    } catch (err) {
       
        res.status(500).send({ err: 'Failed to get currency' })
    }
}


module.exports = {
    getCurrency,
    getOptions
}