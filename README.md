# redux 基础

1. 用到的库

```javascript
redux;
react - redux;
redux - thunk;
immutable;
redux - immutable;
```

1. 全局创建 createStore （ 已经被弃用的 api )

- 异步使用 applyMiddleware(thunk)

```javascript
// 在创建异步actions时 返回的参数会带(dispatch, getState)
const asyncSetState = () => (dispatch, getState) => {
  const state = getState();
  dispatch(actions);
};
```

- 配合 immutable 需搭配 redux-immutable

```javascript
import { combineReducers } from "redux-immutable";
```
