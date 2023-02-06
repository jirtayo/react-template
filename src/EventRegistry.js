//依赖 {onClick:['click'],onClickCapture:['click']}
//所有的原生事件 ['click','dblclick']
export const registrationNameDependencies = {};
export const allNativeEvents = new Set();

/**
 * 注意两个阶段的事件监听
 * @param {*} registrationName react事件名称,比如onClick
 * @param {*} dependencies ['click']
 */
export function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies);
}

function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (let i = 0; i < dependencies.length; i++) {
    allNativeEvents.add(dependencies[i]);
  }
}
