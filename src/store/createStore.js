import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Count/countSlice";
import { COUNT_NAMESPACES } from "./namespaces";

const store = configureStore({
  reducer: {
    [COUNT_NAMESPACES]: counterReducer,
  },
});
export default store;
