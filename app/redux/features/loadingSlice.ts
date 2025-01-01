import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    removeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const getLoadingState = (state: RootState) => state.loading.isLoading;

export const { setLoading, removeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
