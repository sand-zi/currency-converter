
import { httpService } from './httpService'

export const currencyService = {
    query,
    getEmptyCurrency,
    getCurrencyList
}


async function getCurrencyList() {

    return await httpService.get(`currency/options`)

}



async function query({ amount, selectedCurrencyFrom, selectedCurrencyTo, date }) {

    console.log(amount)
    let queryParams = new URLSearchParams()
    queryParams.set('amount', amount)
    queryParams.set('selectedCurrencyFrom', selectedCurrencyFrom)
    queryParams.set('selectedCurrencyTo', selectedCurrencyTo)
    queryParams.set('date', date)
    return await httpService.get(`currency/rate?${queryParams}`)

}

function getEmptyCurrency() {
    return {
        amount: 0,
        selectedCurrencyFrom: '',
        selectedCurrencyTo: '',
        date: getDate()
    }
}


function getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '/' + mm + '/' + dd;
    return today
}
