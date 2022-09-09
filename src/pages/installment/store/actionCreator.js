import * as actions from "./action";
export const setInstallment = (payload) => ({
  type: actions.SET_INSTALLMENT,
  payload,
});

export const setInstallmentAsync = (params) => (dispatch, getState) => {
  const state = getState();
  console.log(state, "state");
  setTimeout(() => {
    dispatch(setInstallment(params));
  }, 1000);
};
