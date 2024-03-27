import { createSlice } from "@reduxjs/toolkit";
import { getExpenses } from "../actions/expensesActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenses.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getExpenses.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getExpenses.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setExpenses } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses;

export default expensesSlice.reducer;
