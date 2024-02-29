import OrderDataFeed from "./socket/OrderDataFeed";
import MarketDataFeed from "./socket/MarketDataFeed";
import "./App.css";
//import Name from "../src/socket/Stockname";

function App() {
  const auth_token = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI2UUFKNE0iLCJqdGkiOiI2NWRlYjc0ZjQ1NzRjZDA5NDI0YTRjYTAiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDkwOTQ3MzUsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwOTE1NzYwMH0.m1qKfW-dpso7d3Yp0dwtPE-i7e_UtT7T9UanyNwiFXI"

  return (
    <div className="app-container">
      {/* <Name/> */}
      <MarketDataFeed token={auth_token} />
      {/* <OrderDataFeed token={auth_token} /> */}
    </div>
  );
}

export default App;