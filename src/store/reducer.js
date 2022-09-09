import { combineReducers } from "redux-immutable";
import installmentReducer from "../pages/installment/store/reducer";

const reducer = combineReducers({
  installment: installmentReducer,
});

export default reducer;
