import React from 'react';

function ExchangeRate({exchangeRate, fromCurrency, toCurrency}) {
  return (
    <div className='exchange-rate'>
      <h3>Exchange Rate</h3>
      <h1>{exchangeRate}</h1>
      <p>{fromCurrency} To {toCurrency}</p>
    </div>
  );
}

export default ExchangeRate;