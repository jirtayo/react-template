import { allNativeEvents } from "./EventRegistry";
import * as SimpleEventPlugin from "./SimpleEventPlugin";
import {
  addEventCaptureListener,
  addEventBubbleListener,
} from "./EventListener";
import { getEventListenerSet } from "./ReactDOMComponentTree";
import { IS_CAPTURE_PHASE } from "./EventSystemFlags";
import { dispatchEvent } from "./ReactDOMEventListener";
import { HostComponent } from "./ReactWorkTags";
import getListener from "./getListener";
//注册插件 其实就是收集原生事件名称
SimpleEventPlugin.registerEvents();
export const nonDelegatedEvents = new Set(["scroll"]);
export function listenToAllSupportedEvents(rootContainerElement) {
  allNativeEvents.forEach((domEventName) => {
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
export function listenToNativeEvent(
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

/**
 * 派发事件
 * @param {*} domEventName 事件名称 event
 * @param {*} eventSystemFlags 事件标志，0或者4
 * @param {*} nativeEvent 原生事件对象
 * @param {*} targetInst fiber实例
 * @param {*} targetContainer 目标容器
 */
export function dispatchEventsForPlugins(
  domEventName,
  eventSystemFlags,
  nativeEvent,
  targetInst,
  targetContainer
) {
  const nativeEventTarget = nativeEvent.target;
  //事件处理函数数组
  const dispatchQueue = [];
  //提取监听事件
  SimpleEventPlugin.extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  );
  processDispatchQueue(dispatchQueue, eventSystemFlags);
  // console.log("dispatchQueue", dispatchQueue);
}
/**
 * 执行所有的Dispatch
 * @param {*} dispatchQueue 队列
 * @param {*} eventSystemFlags 事件标志
 */
export function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0; //是否是捕获阶段
  for (let i = 0; i < dispatchQueue.length; i++) {
    const { event, listeners } = dispatchQueue[i];
    processDispatchQueueItemsInOrder(event, listeners, inCapturePhase);
  }
}
/**
 * 处理dispatch方法
 * @param {*} event 合成事件对象
 * @param {*} dispatchListeners 监听函数
 * @param {*} inCapturePhase 是否是获取阶段
 */
function processDispatchQueueItemsInOrder(
  event,
  dispatchListeners,
  inCapturePhase
) {
  if (inCapturePhase) {
    //因为收集的时候是从内往外，所以捕获阶段是倒序执行
    for (let i = dispatchListeners.length - 1; i >= 0; i--) {
      const { currentTarget, listener } = dispatchListeners[i];
      if (event.isPropagationStopped()) {
        return;
      }
      executeDispatch(event, listener, currentTarget);
    }
  } else {
    for (let i = 0; i < dispatchListeners.length; i++) {
      const { currentTarget, listener } = dispatchListeners[i];
      if (event.isPropagationStopped()) {
        return;
      }
      executeDispatch(event, listener, currentTarget);
    }
  }
}
/**
 * 执行监听函数
 * @param {*} event 合成事件对象
 * @param {*} listener 监听函数
 * @param {*} currentTarget 当前的DOM对象
 */
function executeDispatch(event, listener, currentTarget) {
  event.currentTarget = currentTarget;
  listener(event);
  event.currentTarget = null;
}
/**
 * 收集一个阶段的监听
 * @param {*} targetFiber 对应的fiber {tag:5,type:'button'}
 * @param {*} reactName 事件名 onClick
 * @param {*} nativeEventType 原生事件名 click
 * @param {*} inCapturePhase 是否捕获阶段
 * @returns
 */
export function accumulateSinglePhaseListeners(
  targetFiber,
  reactName,
  nativeEventType,
  inCapturePhase
) {
  const captureName = reactName + "Capture"; //onClickCapture
  //onClick或+onClickCapture
  const reactEventName = inCapturePhase ? captureName : reactName;
  const listeners = []; //所有的监听函数
  let instance = targetFiber; //当前的fiber
  let lastHostComponent = null; //上一个原生DOM元素
  //从当前向上出发，收集所有的Dispatch
  while (instance !== null) {
    const { stateNode, tag } = instance;
    if (tag === HostComponent && stateNode !== null) {
      lastHostComponent = stateNode;
      if (reactEventName !== null) {
        const listener = getListener(instance, reactEventName);
        if (listener != null) {
          listeners.push(
            createDispatchListener(instance, listener, lastHostComponent)
          );
        }
      }
    }
    instance = instance.return;
  }
  return listeners;
}
/**
 * 创建Dispatch
 * @param {*} instance fiber实例
 * @param {*} listener 监听函数
 * @param {*} currentTarget 当前的DOM事件对象
 * @returns Dispatch
 */
function createDispatchListener(instance, listener, currentTarget) {
  return { instance, listener, currentTarget };
}
