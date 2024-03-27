import { createSlice } from "@reduxjs/toolkit";
import { getBudgets } from "../actions/budgetsActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    setBudgets: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBudgets.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getBudgets.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getBudgets.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setBudgets } = budgetsSlice.actions;

export const selectBudgets = (state) => state.budgets;

export default budgetsSlice.reducer;
