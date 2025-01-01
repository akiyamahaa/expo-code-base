import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type LanguageState = {
  value: "vi" | "en";
};

const initialState: LanguageState = {
  value: "en",
};

const languageSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageState>) => {
      state.value = action.payload.value;
    },
  },
});

// Get state
export const getLanguage = (state: RootState) => state.language.value;

// Action and Reducer
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
