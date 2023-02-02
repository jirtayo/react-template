import ReactDOM from "./react-dom";
const element = (
  <div
    style={{ margin: "200px", color: "black" }}
    onClick={(e) => {
      console.log("parent 冒泡");
    }}
    onClickCapture={(e) => {
      console.log("parent 捕捉");
    }}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log("child 冒泡");
        // e.preventDefault();
      }}
      onClickCapture={(e) => {
        console.log("child 捕捉");
      }}
      style={{ color: "red" }}
    >
      点击
    </div>
    <div>点击 2</div>
  </div>
);
ReactDOM.render(element, document.getElementById("root"));
