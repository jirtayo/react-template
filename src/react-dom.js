import { listenToAllSupportedEvents } from "./DOMPluginEventSystem";

function render(vdom, container) {
  listenToAllSupportedEvents(container);
  mount(vdom, container);
}
export function mount(vdom, container) {
  let newDOM = createDOM(vdom, container);
  container.appendChild(newDOM);
}
export function createDOM(vdom, parentDOM) {
  let { type, props } = vdom;
  let dom;
  if (typeof vdom === "string" || typeof vdom === "number") {
    dom = document.createTextNode(vdom);
  } else {
    dom = document.createElement(type);
  }

  if (props) {
    updateProps(dom, {}, props);
    if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    } else if (props.children) {
      mount(props.children, dom);
    }
  }
  return dom;
}

function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    }
    if (key === "style") {
      let style = newProps[key];
      for (let attr in style) {
        dom.style[attr] = style[attr];
      }
    } else if (typeof newProps[key] === "function") {
      continue;
    } else {
      dom[key] = newProps[key];
    }
  }
}
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    mount(childVdom, parentDOM);
  }
}
const ReactDOM = {
  render,
};
export default ReactDOM;
