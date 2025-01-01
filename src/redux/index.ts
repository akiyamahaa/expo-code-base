import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import errorReducer from "./features/errorSlice";
import languageReducer from "./features/languageSlice";
import loadingReducer from "./features/loadingSlice";
import userReducer from "./features/userSlice";
import counterReducer from "./features/counterSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    language: languageReducer,
    error: errorReducer,
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
