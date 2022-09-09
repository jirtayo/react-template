import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action } from "./store";
import { setInstallment, setInstallmentAsync } from "./store/actionCreator";
export default function Installment() {
  const installment = useSelector((state) =>
    state.getIn(["installment", "installment"])
  );
  console.log(installment, "installment");

  // #region
  // const installment1 = useSelector((state) => {
  /**
   * state 浅拷贝数据很容易改变
   */
  //   state.installment = { h: "hello" };
  //   return state;
  // });
  // console.log(installment1);
  // endregiston

  const dispatch = useDispatch();
  return (
    <div>
      Installment: {installment}
      <button
        onClick={() => {
          dispatch(setInstallment("AfterIntalll"));
        }}
      >
        设置
      </button>
      <button
        onClick={() => {
          dispatch(setInstallmentAsync("async AfterIntalllment"));
        }}
      >
        设置 async
      </button>
    </div>
  );
}
