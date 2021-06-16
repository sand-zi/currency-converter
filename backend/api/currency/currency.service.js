const puppeteer = require('puppeteer');


const BASE_URL = 'https://www.boi.org.il/en/Markets/ExchangeRates/Pages/Default.aspx'


const exchangeRateSelector = '#BoiForeignExchangeTabAncor'
const exchangeRateContainerSelector = '#BoiPreviousDatesExchangeRatesSearch'


const chooseCurrencyToSelector = '#selForeignExchange'
const chooseCurrencyFromSelector = '#selSingleForeignExchange'
const dateInputSelector = '#txtForeignExchangeDate'
const amountInputSelector = '#txtForeignExchangeAmount'
const convertButtonSelector = '#btnForeignExchange'

const ForeignExchangeResults = '#BoiForeignExchangeResults'



async function getOptions() {


    try {
        const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 900 });

        // getting to bank of israel page
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        // clicking on Foreign currency Conversion and awaiting for input container to appear
        await page.click(exchangeRateSelector)
        await page.waitForSelector(exchangeRateContainerSelector)
        let options = await page.evaluate(async () => {

            let res = []
            let container = await document.querySelectorAll('#selForeignExchange > option')

            container.forEach(item => {
                let currencyName = item.innerText
                let currencyValue = item.value
                res.push({ currencyName, currencyValue })
            })
            console.log(container)
            return res
        })


        await browser.close();

        return Promise.resolve(options)

    } catch (err) {
        console.log('the error in get options function', err)
    }

}



async function query({ amount, selectedCurrencyFrom, selectedCurrencyTo, date }) {
    // console.log('the amount from query received in currency.service', amount)
    // console.log('the date from query received in currency.service', date)
    // console.log(formatDate(date))
    try {
        const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 900 });

        // getting to bank of israel page
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        // clicking on Foreign currency Conversion and awaiting for input container to appear
        await page.click(exchangeRateSelector)
        await page.waitForSelector(exchangeRateContainerSelector)

        // Enter the amount to input
        await page.$eval(amountInputSelector, (el, value) => el.value = value, amount);


        // Enter Date input
        await page.$eval(dateInputSelector, (el, value) => el.value = value, formatDate(date));
        // Enter the Selection of curruncy from

        await page.select(chooseCurrencyFromSelector, selectedCurrencyFrom)



        // Enter the Selection of curruncy to
        await page.select(chooseCurrencyToSelector, selectedCurrencyTo)

        // press the convert button

        await page.click(convertButtonSelector)

        await page.waitForSelector(ForeignExchangeResults)


        let htmlResult = await page.evaluate(async () => {

            let result = { name: '', value: 0 }
            let currencyName = await document.querySelector("#BoiForeignExchangeResults > table > tbody > tr:nth-child(2) > td.BoiExchangeRatesFirst").innerText
            let currencyValue = await document.querySelector("#BoiForeignExchangeResults > table > tbody > tr:nth-child(2) > td.BoiCurrencyConvertResult").innerText
            result.name = currencyName
            result.value = +currencyValue
            console.log(result)
            return result
        })

        await browser.close();

        return Promise.resolve(htmlResult)

    } catch (err) {
        console.log('the error in parseCurrency function', err)
    }

}

function formatDate(dateString)
    {
        let allDate = dateString.split(' ');
        let thisDate = allDate[0].split('-');
        let newDate = [thisDate[2],thisDate[1],thisDate[0] ].join("/");
        return newDate 
    }




module.exports = {
    query,
    getOptions
}
