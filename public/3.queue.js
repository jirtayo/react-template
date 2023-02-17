class Update {
  constructor(payload) {
    this.payload = payload; // 当前元素
    this.nextUpdate = null; // 指向下一个节点的指针
  }
}
class UpdateQueue {
  constructor() {
    this.baseState = null; // 原状态
    this.firstUpdate = null; // 第一个更新
    this.lastUpdate = null; // 最后一个更新
  }
  clear() {
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update) {
    if (this.firstUpdate === null) {
      // 第一步
      this.firstUpdate = this.lastUpdate = update;
    } else {
      this.lastUpdate.nextUpdate = update; // 上一个最后一个节点 指向自己
      this.lastUpdate = update; // 自己变成最后一个节点
    }
  }
  forceUpdate() {
    let currentState = this.baseState || {};
    let currentUpdate = this.firstUpdate;
    while (currentUpdate) {
      let nexState =
        typeof currentUpdate.payload == "function"
          ? currentUpdate.payload(currentState)
          : currentUpdate.payload;
      currentState = { ...currentState, ...nexState };
      currentUpdate = currentUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpdate = null;
    this.baseState = currentState;
    return currentState;
  }
}

let queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: "taylor" }));
queue.enqueueUpdate(new Update({ age: 999 }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));
queue.forceUpdate();
console.log(queue.baseState);
