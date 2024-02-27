
//import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const FeedCardWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
`;

const FeedCard = ({ ltp, bidAskQuotes }) => {
  return (
    <FeedCardWrapper>
      <div>
        <strong>LTP:</strong> {ltp}
      </div>
      <div>
        <strong>Market Level:</strong>
        {bidAskQuotes.map((quote, index) => (
          <div key={index}>
            <span><strong>BP:</strong> {quote.bp}</span>
            <span><strong>AP:</strong> {quote.ap}</span>
          </div>
        ))}
      </div>
    </FeedCardWrapper>
  );
};

export default FeedCard;