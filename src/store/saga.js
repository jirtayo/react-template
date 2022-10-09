import { all } from "redux-saga/effects";
import { saga as installmentSaga } from "../pages/installment/store/saga";

export function* defSaga() {
  yield all([installmentSaga()]);
}
