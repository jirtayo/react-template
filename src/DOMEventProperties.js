import { registerTwoPhaseEvent } from "./EventRegistry";

const discreteEventPairsForSimpleEventPlugin = [
  "click",
  "click",
  "dblclick",
  "doubleClick",
  "change",
  "change",
];
//原生事件名称和React事件名称的对应关系
export const topLevelEventsToReactNames = new Map(); //{click:onClick}

// 注册简单事件
export function registerSimpleEvents() {
  for (let i = 0; i < discreteEventPairsForSimpleEventPlugin.length; i += 2) {
    const topEvent = discreteEventPairsForSimpleEventPlugin[i]; // 原生事件 dblclick
    const event = discreteEventPairsForSimpleEventPlugin[i + 1]; // react 事件 doubleClick
    const capitalizedEvent = event[0].toUpperCase() + event.slice(1); // DoubleClick
    const reactName = "on" + capitalizedEvent; // onDoubleClick
    topLevelEventsToReactNames.set(topEvent, reactName); // 建立原生事件和React监听事件的对应关系
    registerTwoPhaseEvent(reactName, [topEvent]);
  }
}
