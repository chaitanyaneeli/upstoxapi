import React, { useEffect, useState } from "react";
import proto from "./marketDataFeed.proto";
import { Buffer } from "buffer";
//import FeedCard from "./DataFormat";
import stockSymbols from "../Data/StockSymbols";
import Name from "./Stockname";


const instrumentkeys = stockSymbols;
const protobuf = require("protobufjs");

// Initialize Protobuf root
let protobufRoot = null;
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(proto);
  console.log("Protobuf part initialization complete");
};

// Function to get WebSocket URL
const getUrl = async (token) => {
  const apiUrl = "https://api.upstox.com/v2/feed/market-data-feed/authorize";
  let headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const res = await response.json();
  return res.data.authorizedRedirectUri;
};

// Helper functions for handling Blob and ArrayBuffer
const blobToArrayBuffer = async (blob) => {
  if ("arrayBuffer" in blob) return await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject();
    reader.readAsArrayBuffer(blob);
  });
};

// Decode Protobuf messages
const decodeProfobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }
  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

// MarketDataFeed component
function MarketDataFeed({ token }) {
  const [isConnected, setIsConnected] = useState(false);
  const [feedData, setFeedData] = useState([]);

  // Establish WebSocket connection
  useEffect(() => {
    const connectWebSocket = async (token) => {
      try {
        const wsUrl = await getUrl(token);
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setIsConnected(true);
          console.log("Connected");
          const data = {
            guid: "someguid",
            method: "sub",
            data: {
              mode: "full",
              instrumentKeys: instrumentkeys,
            },
          };
          ws.send(Buffer.from(JSON.stringify(data)));
        };

        ws.onclose = () => {
          setIsConnected(false);
          console.log("Disconnected");
        };

        ws.onmessage = async (event) => {
          const arrayBuffer = await blobToArrayBuffer(event.data);
          let buffer = Buffer.from(arrayBuffer);
          let response = decodeProfobuf(buffer);
          console.log(response);
          setFeedData((currentData) => [
            ...currentData,
            JSON.stringify(response),
           // response,
          ]);
        };

        ws.onerror = (error) => {
          setIsConnected(false);
          console.log("WebSocket error:", error);
        };

        return () => ws.close();
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    initProtobuf();
    connectWebSocket(token);
  }, [token]);

  return (
    <div>
    {Object.keys(feedData).length === 0 ? (
      <p>Loading data...</p>
    ) : (
      <>
        <h1>LTPC Values</h1>
        <ul>
          {Object.entries(feedData).map(([symbol, data]) => (
            <li key={symbol} style={{border: '2px solid red'}}>
              <p>Symbol: {symbol}</p>
              <p>LTP: {data.ff.marketFF.ltpc.ltp}</p>
              {/* {data && data.ff && data.ff.marketFF && data.ff.marketFF.ltpc && (
                <>
                  <p>LTP: {data.ff.marketFF.ltpc.ltp}</p>
                  <p>LTQ: {data.ff.marketFF.ltpc.ltq}</p>
                  <p>CP: {data.ff.marketFF.ltpc.cp}</p>
                </>
              )} */}
               {/* {JSON.stringify(data)} */}
               {data}
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
  );
}

export default MarketDataFeed;