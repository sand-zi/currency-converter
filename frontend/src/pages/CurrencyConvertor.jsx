import { useEffect, useState } from 'react'
import { currencyService } from '../services/currencyService.js'
import { useForm } from '../services/customHooks.js'

export const CurrencyConvertor = () => {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [currency, handleCurrencyChange, setCurrency] = useForm(null)

    useEffect(() => {
        //    Load the select options in array and set it as a state
        const loadOptions = async () => {
            const options = await currencyService.getCurrencyList()
            // console.log(options)
            setCurrencyOptions([...options])
        }
        loadOptions()
    }, [])


    useEffect(() => {
        const loadCurrency = async () => {
            const currency = currencyService.getEmptyCurrency()

            setCurrency(currency)
        }
        loadCurrency()
    }, [])


    const onConvert = async (ev) => {
        ev.preventDefault()
        const data = await currencyService.query(currency)
        console.log("Did we received anythind", data)
    }

    if (!currencyOptions.length) return <div>Loading</div>
    if (!currency) return <div>Loading</div>
    return (
        <form className="currency-convertor flex justify-center align-center column" onSubmit={onConvert}>
            <label>Amount:
                <input type="number" name="amount" placeholder="Amount" value={currency.amount} onChange={handleCurrencyChange} />
            </label>
            <label>Date:
                <input type="date" name="date" value={currency.date} onChange={handleCurrencyChange} />
            </label>
            <label>Currency:
                <select value={currency.selectedCurrencyFrom} name='selectedCurrencyFrom' onChange={handleCurrencyChange}>
                    {currencyOptions.map(option => (
                        <option key={option.currencyValue} value={option.currencyValue}>{option.currencyName}</option>
                    ))}

                </select>
            </label>
            <label>Choose Currency:
                <span>Up to six currencies can be chosen simultaneously by pressing the 'CTRL' key</span>
                <select value={currency.selectedCurrencyTo} name='selectedCurrencyTo' onChange={handleCurrencyChange}>
                    {currencyOptions.map(option => (
                        <option key={option.currencyValue} value={option.currencyValue}>{option.currencyName}</option>
                    ))}


                </select>
            </label>
            <button className='btn-primary'>Convert</button>
        </form>
    )
}