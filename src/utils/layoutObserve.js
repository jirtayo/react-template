const subscribes = new Map();
const layoutElement = "#layout";
let subId = -1;
let size = {};
let layout = undefined;

class Observe {
  constructor() {
    this.subId = -1;
    this.size = {};
    this.layout = undefined;
    this.subscribes = new Map();
  }
  register() {
    if (!this.layout) {
      this.layout = document.querySelector(layoutElement);
      this.handleListener = this.handleListener.bind(this);
    }
    window.addEventListener("resize", this.handleListener);
    this.handleListener();
  }
  unRegister() {
    window.removeEventListener("resize", this.handleListener);
    this.subscribes.clear();
  }
  handleListener() {
    const bound = this.layout.getBoundingClientRect();
    const size = {
      width: bound.width,
      height: bound.height,
    };
    this.dispatch(size);
  }
  dispatch(currentSize) {
    this.size = currentSize;
    this.subscribes.forEach((func) => func(currentSize));
    return this.subscribes.size > 0;
  }
  subscribe(func) {
    if (!subscribes.size) this.register();
    this.subId += 1;
    this.subscribes.set(this.subId, func);
    func(this.size);
    return this.subId;
  }
  unSubscribe(id) {
    this.subscribes.delete(id);
    if (!subscribes.size) {
      this.unRegister();
    }
  }
}

const alayoutResponsiveObserve = new Observe();

const layoutResponsiveObserve = {
  dispatch(currentSize) {
    size = currentSize;
    subscribes.forEach((func) => func(currentSize));
    return subscribes.size > 0;
  },
  subscribe(func) {
    if (!subscribes.size) {
      this.register();
    }
    subId += 1;
    subscribes.set(subId, func);
    // func(size);
    return subId;
  },
  unSubscribe(id) {
    subscribes.delete(id);
    if (!subscribes.size) {
      this.unRegister();
    }
  },
  register() {
    if (!layout) {
      layout = document.querySelector(layoutElement);
      this.handleListener = this.handleListener.bind(this);
    }
    window.addEventListener("resize", this.handleListener);
    this.handleListener();
  },
  unRegister() {
    window.removeEventListener("resize", this.handleListener);
    subscribes.clear();
  },
  handleListener() {
    const bound = layout.getBoundingClientRect();
    const size = {
      width: bound.width,
      height: bound.height,
    };
    this.dispatch(size);
  },
};

export default alayoutResponsiveObserve;
