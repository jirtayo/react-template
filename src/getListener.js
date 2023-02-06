import { getFiberCurrentPropsFromNode } from "./ReactDOMComponentTree";
/**
 * 返回属性里的监听函数
 * @param {*} inst fiber实例
 * @param {*} registrationName 注册名称
 * @returns
 */
export default function getListener(inst, registrationName) {
  const stateNode = inst.stateNode;
  const props = getFiberCurrentPropsFromNode(stateNode);
  const listener = props[registrationName];
  return listener;
}
