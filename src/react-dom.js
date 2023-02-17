import { TAG_ROOT } from "./constants";
import { scheduleRoot } from "./schedule";

// render 是要把一个元素渲染到一个容器内部
function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // 每一个fiber都有一个tag标识，表示元素类型
    stateNode: container, // 指向真实dom元素
    props: { children: [element] },
  };
  scheduleRoot(rootFiber);
}
const ReactDOM = {
  render,
};
export default ReactDOM;
