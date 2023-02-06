import { SyntheticEvent } from "../SyntheticEvent";
import { registerTwoPhaseEvent } from "../EventRegistry";
import { accumulateTwoPhaseListeners } from "../DOMPluginEventSystem";
/**
 * 提取事件处理函数
 * @param {*} dispatchQueue 队列
 * @param {*} domEventName 事件名称 click
 * @param {*} targetInst fiber实例
 * @param {*} nativeEvent 原生事件
 * @param {*} nativeEventTarget 原生事件对象
 * @param {*} eventSystemFlags 事件标志
 */
function extractEvents(
  dispatchQueue,
  domEventName,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  if (domEventName === "input" || domEventName === "change") {
    const listeners = accumulateTwoPhaseListeners(targetInst, "onChange");
    if (listeners.length > 0) {
      const event = new SyntheticEvent(
        "onChange",
        "change",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({ event, listeners });
    }
  }
}

function registerEvents() {
  registerTwoPhaseEvent("onChange", ["change", "input"]);
}
export { registerEvents, extractEvents };
