import { createSlice } from "@reduxjs/toolkit";
import { getCollaborations } from "../actions/collaborationsActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const collaborationsSlice = createSlice({
  name: "collaborations",
  initialState,
  reducers: {
    setCollaborations: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCollaborations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getCollaborations.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getCollaborations.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setCollaborations } = collaborationsSlice.actions;

export const selectCollaborations = (state) => state.collaborations;

export default collaborationsSlice.reducer;
