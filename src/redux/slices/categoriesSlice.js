import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoriesActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getCategories.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setCategories } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories;

export default categoriesSlice.reducer;
