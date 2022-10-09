import axios from "axios";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { SET_INSTALLMENT, SET_INSTALLMENT_SAGA } from "./action";
import { setInstallment as setInstallmentAction } from "./actionCreator";

// SET_INSTALLMENT 的副作用
function* setInstallment(action) {
  // 获取 installment reducer
  // const installment = yield select((state) =>
  //   state.getIn(["installment", "installment"])
  // );

  // 发送请求
  const { data } = yield call(axios.get, "url", { params: "params" });
  // 拿到请求的数据
  yield put(setInstallmentAction(data));
  console.log(action, "stateeeeee");
}
// SET_INSTALLMENT_SAGA 的副作用
function* setInstallmentAsync(action) {
  yield put(setInstallmentAction(action.payload));
}
/**
 * takeEvery(actionName, saga, ...args) 触发了多少次异步的action就会执行多少次异步任务
 * takeLatest(actionName, saga, ...args) 每次触发都会取消掉上一次正在执行的异步任务
 * throttle(ms, actionName, saga, ...args) 匹配到一个对应的action后，会执行一个异步任务，放在底层的buffer中，第一个ms秒内不会执行其他任务
 */
export function* saga() {
  // yield takeEvery(SET_INSTALLMENT, setInstallment);
  // yield takeLatest(SET_INSTALLMENT, setInstallment);
  yield takeLatest(SET_INSTALLMENT_SAGA, setInstallmentAsync);
}
