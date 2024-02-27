import OrderDataFeed from "./socket/OrderDataFeed";
import MarketDataFeed from "./socket/MarketDataFeed";
import "./App.css";
//import Name from "../src/socket/Stockname";

function App() {
  const auth_token = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2UUFKNE0iLCJqdGkiOiI2NWRkOGRiZTQ1NzRjZDA5NDI0YTJmYTciLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDkwMTg1NTgsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwOTA3MTIwMH0.MKwsMEh7ovpY_d4hD5QBJyEgBhYnLGQ_3cUgmp2AldU"

  return (
    <div className="app-container">
      {/* <Name/> */}
      <MarketDataFeed token={auth_token} />
      {/* <OrderDataFeed token={auth_token} /> */}
    </div>
  );
}

export default App;