const randomKey = Math.random().toString(36).slice(2);
export const internalEventHandlersKey = "__reactEvents$" + randomKey; //dom上的事件绑定集合
export function getEventListenerSet(node) {
  let elementListenerSet = node[internalEventHandlersKey];
  // console.dir(node, node[internalEventHandlersKey], "hahahah@@@");
  if (elementListenerSet === undefined) {
    elementListenerSet = node[internalEventHandlersKey] = new Set();
  }
  return elementListenerSet;
}
