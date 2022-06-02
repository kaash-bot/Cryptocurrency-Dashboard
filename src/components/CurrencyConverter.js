import React from 'react';
import { useState } from 'react';
import ExchangeRate from './ExchangeRate';
import axios from 'axios';

function CurrencyConverter() {
    const currencies = ["ETH", "BTC", "USDT", "BNB", "USD", "EUR", "JPY", "GBP", "CHF", "INR", "RUB"];
    const [fromCurrency, setfromCurrency] = useState('BTC');
    const [toCurrency, settoCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setexchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { to_currency: toCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: fromCurrency },
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
            setexchangeRate(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
            setResult(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] * amount);
        }).catch((error) => {
            console.error(error);
        });
    }

    console.log(exchangeRate);

    return (
        <div className='currency-converter'>
            <h2>Currency Converter</h2>

            <table>
                <tbody>
                    <tr>
                        <td>Current Currency:</td>
                        <td>
                            <input type="number"
                                name="curr-amount-1"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={fromCurrency} name="curr-option-1"
                                className="curr-options"
                                onChange={(event) => setfromCurrency(event.target.value)}
                            >
                                {currencies.map(currency => (<option value={currency}>{currency}
                                </option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Target Currency:</td>
                        <td>
                            <input type="number"
                                name="curr-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select value={toCurrency}
                                name="curr-option-2"
                                className="curr-options"
                                onChange={(event) => settoCurrency(event.target.value)}
                            >
                                {currencies.map(currency => (<option value={currency}>{currency}
                                </option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>
            <ExchangeRate
                exchangeRate={exchangeRate}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
            />
        </div>
    );
}

export default CurrencyConverter;