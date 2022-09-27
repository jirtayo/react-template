import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COUNT_NAMESPACES } from "../store/namespaces";
import { fetchCount } from "./service";

const name = COUNT_NAMESPACES;
const initialState = {
  count: 0,
};
/**
 * 两种异步action
 * 第一种 createAsyncThunk
 * 第二种 手动返回一个函数(dispatch, getState) => ()
 */
export const incrementAsync = createAsyncThunk(
  "count/fetchCount",
  async (params) => {
    const data = await fetchCount(params);
    return data;
  }
);

const counterSlice = createSlice({
  name,
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        console.log(state, action, "pending");
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.count += action.payload;
        console.log(state, action, "success");
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        console.log(state, action, "rejected");
      });
  },
});

export const selectCount = (state) => state[name].count;
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};
export default counterSlice.reducer;
