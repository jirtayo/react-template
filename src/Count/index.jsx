import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./countSlice";
export default function Count() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        按钮 +
      </button>
      {count}
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        按钮 -
      </button>
      <button
        onClick={() => {
          dispatch(incrementAsync(100));
        }}
      >
        按钮 async
      </button>
      <button
        onClick={() => {
          dispatch(incrementIfOdd(1));
        }}
      >
        按钮 奇数加
      </button>
    </div>
  );
}
