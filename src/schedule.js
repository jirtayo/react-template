import {
  ELEMENT_TEXT,
  PLACEMENT,
  TAG_HOST,
  TAG_ROOT,
  TAG_TEXT,
} from "./constants";
import { setProps } from "./utils";

/**
 * 从根节点开始渲染和调度
 * 两个阶段
 * + render阶段 比较花时间 需要对任务拆分，拆分的维度为虚拟dom 此阶段可以暂停
 *    - 根据虚拟dom生成fiber树
 *    - 收集effect list、成果是effect list 知道那些节点更新、删除、增加
 *   diff阶段 对比新旧的虚拟dom，进行增量 更新或者创建
 *
 * + commit阶段，进行dom更新创建阶段，不能中断
 *
 * effect list 副作用也是一个单链表
 *  - nextEffect
 */
let nextUnitOfWork = null; // 下一个工作单元
let workInProgressRoot = null; // rootFiber应用的根

export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = rootFiber;
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber);
  if (currentFiber.child) {
    return currentFiber.child;
  }

  while (currentFiber) {
    // 没有儿子让自己完成
    completeUnitOfWork(currentFiber);
    // 找兄弟
    if (currentFiber.sibling) {
      return currentFiber.sibling;
    }
    // 找父级
    currentFiber = currentFiber.return;
  }
}

/**
 * 开始节点工作
 * - 创建真实dom元素
 * - 创建子fiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber);
  }
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
  let newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    // 创建文本节点
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps);
}
// 先处理自己 如果是一个原生节点 创建真实dom - 之后创建子fiber
function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildrenIndex = 0; // 新子节点的索引
  let prevSibling; // 上一个新的子fiber
  while (newChildrenIndex < newChildren.length) {
    let newChild = newChildren[newChildrenIndex];
    let tag;
    if (newChild.type == ELEMENT_TEXT) {
      tag = TAG_TEXT; // 这是个文本节点
    } else if (typeof newChild.type === "string") {
      tag = TAG_HOST; // 这是个原生dom元素
    }
    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      return: currentFiber,
      stateNode: null, // 还没有创建dom元素
      effectTag: PLACEMENT, // 副作用标识 render的时候会收集增加 删除 更新等副作用
      nextEffect: null,
    };
    if (newFiber) {
      if (newChildrenIndex == 0) {
        // 如果当前索引为0 说明是太子
        currentFiber.child = newFiber;
      } else {
        // 让太子的sibling指向 弟弟
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
    newChildrenIndex++;
  }
}
/**
 * 完成节点工作:
 * 每个fiber有两个属性
 *  - firstEffect 指向第一个有副作用的子fiber
 *  - lastEffect 指向最后一个有副作用的子fiber
 * 中间的用nextEffect做成一个单链表
 *  firstEffect= 大儿子.nextEffect => 二儿子.nextEffect => 三儿子
 *              A1
 *             /  \
 *           B1    B2
 *          / \    / \
 *         C1 C2  D1 D2
 *  链条是A1: C1 -(next)> C2 -> B1 -> D1 -> D2 -> B2 -> A1
 */
function completeUnitOfWork(currentFiber) {
  const returnFiber = currentFiber.return;
  if (returnFiber) {
    // 把自己儿子的effect list链挂在父级上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (!!currentFiber.lastEffect) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }
    // 把自己挂在父级上
    const effectTag = currentFiber.effectTag;
    if (effectTag) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;
    }
  }
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  if (!currentFiber) {
    return;
  }
  let returnFiber = currentFiber.return; //先获取父Fiber
  const domReturn = returnFiber.stateNode; //获取父的DOM节点
  if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {
    //如果是新增DOM节点
    let nextFiber = currentFiber;
    domReturn.appendChild(nextFiber.stateNode);
  }
  currentFiber.effectTag = null;
}

// 循环执行工作 nextUnitOfWork
function workLoop(deadline) {
  let shouldYield = false; // 是否让出时间片或者控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行完一个任务后
    shouldYield = deadline.timeRemaining() < 1; // 没有时间就要让出控制权
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot();
    console.log("render阶段结束");
  }
  // 如果时间片到期后还有任务没有完成，再次请求调度
  requestIdleCallback(workLoop, { timeout: 500 });
}

requestIdleCallback(workLoop, { timeout: 500 });
