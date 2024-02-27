import React from 'react';

const StockDetails = ({ stockData }) => {
  if (!stockData) {
    return <div>Loading or error handling...</div>; // You can replace this with your loading or error component
  }

  const renderStockDetails = () => {
    return Object.keys(stockData.feeds).map(symbol => {
      const { ltpc } = stockData.feeds[symbol]?.ff?.marketFF?.ltpc || {};

      if (!ltpc) {
        return null; // Skip rendering if ltpc is not available
      }

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
