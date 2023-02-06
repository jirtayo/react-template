/**
 * 在根组件进行代理监听，当发生点击事件时，从事件元素出发向上寻找开始寻找事件属性上的react事件
 * 因为绑定了两个事件捕获和冒泡，所以会得到两个事件队列，再执行这两个事件队列
 * 捕获的是：跟组件、父react、子react、父原生、子原生， 冒泡的是：子原生、父原生、子react、父react、根组件
 */

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
        // e.stopPropagation();
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
