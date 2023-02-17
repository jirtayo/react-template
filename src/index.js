// react-96.3 fiber
import React from "react";
import ReactDOM from "./react-dom";
let style = {
  border: "3px solid red",
  margin: "10px",
};
function App() {
  return element;
}
let element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}>
        C1
      </div>
      <div id="C2" style={style}>
        C2
      </div>
    </div>
    <div id="B2" style={style}>
      B2
    </div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));
console.log(<App />);
