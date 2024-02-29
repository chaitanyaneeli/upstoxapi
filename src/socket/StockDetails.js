import React from 'react';

const StockDetails = ({ stockData }) => {
  const parsedFeeds = JSON.parse(stockData);
  const renderStockDetails = () => {
    return Object.keys(stockData).map(symbol => {
      const { ltpc } = stockData[symbol].ff.marketFF.ltpc;

      return (
        <div key={symbol}>
          <h3>Symbol: {symbol}</h3>
          <p>LTPC: {ltpc.ltp}</p>
          <p>LTQ: {ltpc.ltq}</p>
          <p>CP: {ltpc.cp}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Stock Details</h2>
      {renderStockDetails()}
    </div>
  );
};

export default StockDetails;
