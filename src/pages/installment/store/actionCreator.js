import * as actions from "./action";
export const setInstallment = (payload) => ({
  type: actions.SET_INSTALLMENT,
  payload,
});

// 异步action 需要 thunk 中间件
export const setInstallmentAsync = (params) => (dispatch, getState) => {
  const state = getState();
  console.log(state, "state");
  setTimeout(() => {
    dispatch(setInstallment(params));
  }, 1000);
};

export const setInstallmentAsyncSaga = (payload) => ({
  type: actions.SET_INSTALLMENT_SAGA,
  payload,
});
