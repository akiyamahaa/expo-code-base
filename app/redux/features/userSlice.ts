import { createSlice } from "@reduxjs/toolkit";

export interface UserProfile {
  email: string;
}

type UserState = {
  user: UserProfile | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = { email: "admin@gmail.com" };
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
