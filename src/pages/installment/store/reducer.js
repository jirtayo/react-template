import { fromJS } from "immutable";
import * as actions from "./action";

const initState = fromJS({
  installment: "init_state",
});
console.log(initState, "initState");

export default (state = initState, action) => {
  console.log(action, "每次的action");
  switch (action.type) {
    case actions.SET_INSTALLMENT:
      return state.set("installment", action.payload);
    // {
    //   ...state,
    //   installment: action.payload,
    // };

    default:
      return state;
      break;
  }
};
