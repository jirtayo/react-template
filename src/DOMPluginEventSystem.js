import { allNaticeEvents } from "./EventRegistry";
import * as SimpleEventPlugin from "./SimpleEventPlugin";
import {
  addEventCaptureListener,
  addEventBubbleListener,
} from "./EventListener";
import { getEventListenerSet } from "./ReactDOMComponentTree";
import { IS_CAPTURE_PHASE } from "./EventSystemFlags";
import { dispatchEvent } from "./ReactDOMEventListener";

// 注册插件 收集原生事件名称
SimpleEventPlugin.registerEvents();

const nonDelegatedEvents = new Set(["scroll"]);
export function listenToAllSupportedEvents(rootContainerElement) {
  allNaticeEvents.forEach((domEventName) => {
    //注册冒泡阶段
    if (!nonDelegatedEvents.has(domEventName)) {
      listenToNativeEvent(
        domEventName, //click
        false, //isCapturePhaseListener=false
        rootContainerElement
      );
    }
    //注册捕获阶段
    listenToNativeEvent(
      domEventName, //click
      true, //isCapturePhaseListener=false
      rootContainerElement //容器DOM元素
    );
  });
}

/**
 *
 * @param {*} domEventName DOM事件 click
 * @param {*} isCapturePhaseListener 是否是捕获事件监听
 * @param {*} rootContainerElement 根容器
 * @param {*} targetElement 目标元素
 * @param {*} eventSystemFlags 事件系统标志
 */
function listenToNativeEvent(
  domEventName,
  isCapturePhaseListener,
  rootContainerElement,
  eventSystemFlags = 0
) {
  const listenerSet = getEventListenerSet(rootContainerElement); //[]
  //click__bubble click__capture
  const listenerSetKey = getListenerSetKey(
    domEventName,
    isCapturePhaseListener
  );
  if (!listenerSet.has(listenerSetKey)) {
    if (isCapturePhaseListener) {
      eventSystemFlags |= IS_CAPTURE_PHASE; //4
    }
    addTrappedEventListener(
      rootContainerElement,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
    listenerSet.add(listenerSetKey);
  }
}
/**
 * 根据事件名称和是否捕获阶段得到监听的key
 * @param {*} domEventName 事件名称 click
 * @param {*} capture  是否是捕获阶段
 * @returns 监听事件的key
 */
export function getListenerSetKey(domEventName, capture) {
  return `${domEventName}__${capture ? "capture" : "bubble"}`;
}
/**
 * 注册监听函数
 * @param {*} targetContainer 绑定的目标容器
 * @param {*} domEventName  事件名称
 * @param {*} eventSystemFlags  事件系统标识
 * @param {*} isCapturePhaseListener  是否是捕获阶段
 */
function addTrappedEventListener(
  targetContainer,
  domEventName,
  eventSystemFlags,
  isCapturePhaseListener
) {
  let listener = dispatchEvent.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
  if (isCapturePhaseListener) {
    addEventCaptureListener(targetContainer, domEventName, listener);
  } else {
    addEventBubbleListener(targetContainer, domEventName, listener);
  }
}
