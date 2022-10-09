import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

/**
 * 中间件
 * 实现了从 action => middleware => reducer 数据流的改变
 * 可以实现 异步action、 action过滤、错误日志...
 */
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
