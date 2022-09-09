import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Installment from "./pages/installment";

function App() {
  return (
    <Provider store={store}>
      <Installment />
    </Provider>
  );
}

export default App;
