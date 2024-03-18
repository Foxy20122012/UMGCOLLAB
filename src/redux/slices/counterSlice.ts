import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  value: number;
};

const initialState = {
  value: (typeof window !== 'undefined') ? Number(localStorage.getItem('counter-value')) : 0,
} as CounterState;



export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      localStorage.setItem('counter-value', (state.value + 1).toString())
      state.value += 1;
    },
    decrement: (state) => {
      localStorage.setItem('counter-value', (state.value - 1).toString())
      state.value -= 1;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
} = counter.actions;
export default counter.reducer;
