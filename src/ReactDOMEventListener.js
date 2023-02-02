/**
 * 事件处理函数
 * @param {*} domEventName 事件名 click
 * @param {*} eventSystemFlags 4 事件系统标志
 * @param {*} targetContainer 代理的容器 div#root
 * @param {*} nativeEvent 原生的事件对象 MouseEvent
 */
export function dispatchEvent(
  domEventName,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  const nativeEventTarget = nativeEvent.target; //获得事件来源对象
  console.log(
    "domEventName",
    domEventName,
    "eventSystemFlags",
    eventSystemFlags,
    "nativeEventTarget",
    nativeEventTarget
  );
}
