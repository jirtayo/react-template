import React from "react";
import ReactDOM from "react-dom/client";
import NiceModal from "@ebay/nice-modal-react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </React.StrictMode>
);
