import React, { useState, useEffect } from 'react';
import instrumentData from '../Data/NseStockData';
import stockSymbols from '../Data/StockSymbols';

const InstrumentList = () => {
  const [instruments, setInstruments] = useState([]);
  const [instrumentKeys, setInstrumentKeys] = useState(stockSymbols);

  useEffect(() => {
    console.log(instrumentData);
    setInstruments(instrumentData);
  }, []);

  const getNameByInstrumentKey = (instrumentKey) => {
    const instrument = instruments.find(item => item.instrument_key === instrumentKey);
    return instrument ? instrument.name : 'Not Found';
  };

  return (
    <div>
      {instrumentKeys.map(instrumentKey => (
        <div key={instrumentKey}>
          <h3>{getNameByInstrumentKey(instrumentKey)}</h3>
        </div>
      ))}
    </div>
  );
};

export default InstrumentList;