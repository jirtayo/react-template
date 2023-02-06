// toString 取进制
const randomKey = Math.random().toString(36).slice(2);
export const internalEventHandlersKey = "__reactEvents$" + randomKey; //dom上的事件绑定集合
export const internalInstanceKey = "__reactFiber$" + randomKey; //dom上的fiber节点
export const internalPropsKey = "__reactProps$" + randomKey; //dom上的属性对象
export function getEventListenerSet(node) {
  let elementListenerSet = node[internalEventHandlersKey];
  // console.dir(node, node[internalEventHandlersKey], "hahahah@@@");
  if (elementListenerSet === undefined) {
    elementListenerSet = node[internalEventHandlersKey] = new Set();
  }
  return elementListenerSet;
}

/**
 * 根据DOM元素获取对应的fiber对象
 * @param {*} targetNode DOM元素
 * @returns fiber对象
 */
export function getClosestInstanceFromNode(targetNode) {
  let targetInst = targetNode[internalInstanceKey];
  if (targetInst) {
    return targetInst;
  }
}
export function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}
