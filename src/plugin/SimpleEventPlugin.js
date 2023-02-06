import {
  registerSimpleEvents,
  topLevelEventsToReactNames,
} from "../DOMEventProperties";
import { IS_CAPTURE_PHASE } from "../const/EventSystemFlags";
import { SyntheticMouseEvent } from "../SyntheticEvent";
import { accumulateSinglePhaseListeners } from "../DOMPluginEventSystem";
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
  nativeEventTarget,
  eventSystemFlags
) {
  const reactName = topLevelEventsToReactNames.get(domEventName); //click=>onClick
  let SyntheticEventCtor;
  let reactEventType = domEventName; //click
  switch (domEventName) {
    case "click":
      SyntheticEventCtor = SyntheticMouseEvent;
      break;
    default:
      break;
  }
  const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;
  const listeners = accumulateSinglePhaseListeners(
    targetInst,
    reactName,
    nativeEvent.type,
    inCapturePhase
  );
  if (listeners.length > 0) {
    const event = new SyntheticEventCtor(
      reactName,
      reactEventType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
    dispatchQueue.push({ event, listeners });
  }
}

export { registerSimpleEvents as registerEvents, extractEvents };
